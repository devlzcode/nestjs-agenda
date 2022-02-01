import { DefineOptions } from 'agenda';
import { AgendaScheduleType } from './enums';

export type AgendaDefinitionOptions = {
  name: string;
  options: DefineOptions;
};

export type AgendaScheduleOptions = {
  type: AgendaScheduleType;
  when: string;
};
