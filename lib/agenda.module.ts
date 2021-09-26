import {
  DynamicModule,
  Logger,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { DiscoveryModule, ModuleRef } from '@nestjs/core';
import { AgendaService } from './agenda.service';
import { AgendaMetadataAccessor } from './agenda-metadata.acessor';
import { AgendaExplorer } from './agenda.explorer';
import {
  AgendaModuleOptions,
  AgendaModuleAsyncOptions,
  AgendaOptionsFactory,
} from './interfaces';
import { AGENDA_MODULE_OPTIONS } from './agenda.constants';

const logger = new Logger('Agenda');

@Module({
  imports: [DiscoveryModule],
  providers: [
    {
      provide: AgendaService,
      inject: [AGENDA_MODULE_OPTIONS],
      useFactory: async (options: AgendaModuleOptions) => {
        const agendaService = new AgendaService(options);
        logger.log('Starting Agenda...');
        await agendaService.start();
        logger.log('Agenda started');
        return agendaService;
      },
    },
    AgendaExplorer,
    AgendaMetadataAccessor,
  ],
})
export class AgendaModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  static forRoot(options: AgendaModuleOptions): DynamicModule {
    return {
      global: true,
      module: AgendaModule,
      providers: [this.createAgendaProvider(options)],
    };
  }

  static forRootAsync(options: AgendaModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: AgendaModule,
      imports: options.imports || [],
      providers: [...this.createAsyncProviders(options)],
    };
  }

  static createAgendaProvider(options: AgendaModuleOptions): Provider {
    return { provide: AGENDA_MODULE_OPTIONS, useValue: options };
  }

  private static createAsyncProviders(
    options: AgendaModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AgendaModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AGENDA_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: AGENDA_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AgendaOptionsFactory) =>
        await optionsFactory.createAgendaOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

  async onApplicationShutdown() {
    logger.log('Stopping Agenda...');
    const agendaService = this.moduleRef.get(AgendaService);
    await agendaService.stop();
    await agendaService.close();
  }
}
