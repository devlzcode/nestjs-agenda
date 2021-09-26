import { OnModuleInit, Logger, Injectable } from '@nestjs/common';
import { DiscoveryService, ModuleRef, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { AgendaService } from './agenda.service';
import { AgendaMetadataAccessor } from './agenda-metadata.acessor';
import { AgendaScheduleType } from './enums';

@Injectable()
export class AgendaExplorer implements OnModuleInit {
  private readonly logger = new Logger('AgendaExplorer');

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAcessor: AgendaMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onModuleInit() {
    this.explore();
  }

  explore() {
    const agendaService = this.moduleRef.get<AgendaService>(AgendaService);
    const providers: InstanceWrapper[] = this.discoveryService.getProviders();
    providers
      .filter((wrapper) => this.metadataAcessor.isProcessor(wrapper.metatype))
      .forEach((wrapper) => {
        const { instance } = wrapper;
        if (!wrapper.isDependencyTreeStatic()) {
          this.logger.warn(`${wrapper.name} is request scoped, skipping...`);
          return;
        }

        this.metadataScanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          (key: string) => {
            const methodRef = instance[key];
            const processor = (...args: unknown[]) =>
              methodRef.call(instance, ...args);
            const { name, options } =
              this.metadataAcessor.getDefinitionOptions(methodRef);
            this.logger.log(`Registering processor "${name}"`);
            agendaService.define(name, options, processor);

            const scheduleOptions =
              this.metadataAcessor.getScheduleOptions(methodRef);
            if (!scheduleOptions) return;
            const { when, type } = scheduleOptions;
            this.logger.log(
              `Scheduling processor "${name}" of type "${type}" ${when}`,
            );
            type === AgendaScheduleType.Every
              ? agendaService.every(<string>when, name)
              : agendaService.schedule(when, name, {});
          },
        );
      });
  }
}
