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
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .forEach((wrapper) => {
        const { instance } = wrapper;
        if (!instance || !Object.getPrototypeOf(instance)) {
          return;
        }
        this.metadataScanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          (key: string) => {
            const methodRef = instance[key];
            const isProcessor = this.metadataAcessor.isProcessor(methodRef);
            if (!isProcessor) return;
            const wrappedFn = this.wrapFunctionInTryCatchBlocks(
              methodRef,
              instance,
            );
            const name = this.metadataAcessor.getProcessorName(methodRef);
            const options = this.metadataAcessor.getProcessorOptions(methodRef);
            this.logger.log(`Registering processor "${name}"`);
            agendaService.define(
              name,
              !options ? wrappedFn : options,
              !options ? undefined : wrappedFn,
            );
            const hasSchedule = this.metadataAcessor.hasSchedule(methodRef);
            if (!hasSchedule) return;
            const when = this.metadataAcessor.getScheduleWhen(methodRef);
            const type = this.metadataAcessor.getScheduleType(methodRef);
            this.logger.log(
              `Scheduling processor "${name}" of type "${type}" ${when}`,
            );
            type === AgendaScheduleType.Every
              ? agendaService.every(when, name)
              : agendaService.schedule(when, name, {});
          },
        );
      });
  }

  private wrapFunctionInTryCatchBlocks(methodRef: Function, instance: any) {
    return async (...args: unknown[]) => {
      try {
        await methodRef.call(instance, ...args);
      } catch (error) {
        this.logger.error(error);
      }
    };
  }
}
