import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { DefineOptions } from "agenda";
import { AgendaScheduleType } from "./enums";
import {
  AGENDA_MODULE_DEFINITION,
  AGENDA_MODULE_PROCESSOR,
  AGENDA_MODULE_SCHEDULE,
} from "./agenda.constants";

interface AgendaDefinitionOptions {
  name: string;
  options: DefineOptions;
}

interface AgendaScheduleOptions {
  type: AgendaScheduleType;
  when: string | Date;
}

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
      target
    );
  }

  getScheduleOptions(target: Function) {
    return this.reflector.get<AgendaScheduleOptions>(
      AGENDA_MODULE_SCHEDULE,
      target
    );
  }
}
