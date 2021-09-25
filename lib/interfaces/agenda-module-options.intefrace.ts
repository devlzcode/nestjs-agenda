import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { AgendaConfig } from 'agenda';

export type AgendaModuleOptions = AgendaConfig;

export interface AgendaOptionsFactory {
  createAgendaOptions(): Promise<AgendaModuleOptions> | AgendaModuleOptions;
}

export interface AgendaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AgendaOptionsFactory>;
  useClass?: Type<AgendaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AgendaModuleOptions> | AgendaModuleOptions;
  inject?: any[];
}
