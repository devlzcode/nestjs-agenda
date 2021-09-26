import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AgendaDefinitionOptions, AgendaScheduleOptions } from './agenda.types';
import {
  AGENDA_MODULE_DEFINITION,
  AGENDA_MODULE_PROCESSOR,
  AGENDA_MODULE_SCHEDULE,
} from './agenda.constants';

@Injectable()
export class AgendaMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  isProcessor(target: Function) {
    if (!target) {
      return false;
    }
    return !!this.reflector.get<boolean>(AGENDA_MODULE_PROCESSOR, target);
  }

  getDefinitionOptions(target: Function) {
    return this.reflector.get<AgendaDefinitionOptions>(
      AGENDA_MODULE_DEFINITION,
      target,
    );
  }

  getScheduleOptions(target: Function) {
    return this.reflector.get<AgendaScheduleOptions>(
      AGENDA_MODULE_SCHEDULE,
      target,
    );
  }
}
