import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DefineOptions } from 'agenda';
import {
  AGENDA_PROCESSOR,
  AGENDA_PROCESSOR_NAME,
  AGENDA_PROCESSOR_OPTIONS,
  AGENDA_SCHEDULE,
  AGENDA_SCHEDULE_WHEN,
  AGENDA_SCHEDULE_TYPE,
} from './agenda.constants';
import { AgendaScheduleType } from './enums';

@Injectable()
export class AgendaMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  isProcessor(target: Function) {
    return this.reflector.get<boolean>(AGENDA_PROCESSOR, target);
  }

  hasSchedule(target: Function) {
    return this.reflector.get<string>(AGENDA_SCHEDULE, target);
  }

  getProcessorName(target: Function) {
    return this.reflector.get<string>(AGENDA_PROCESSOR_NAME, target);
  }

  getProcessorOptions(target: Function) {
    return this.reflector.get<DefineOptions>(AGENDA_PROCESSOR_OPTIONS, target);
  }

  getScheduleWhen(target: Function) {
    return this.reflector.get<string>(AGENDA_SCHEDULE_WHEN, target);
  }

  getScheduleType(target: Function) {
    return this.reflector.get<AgendaScheduleType>(AGENDA_SCHEDULE_TYPE, target);
  }
}
