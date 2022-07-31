import { SetMetadata } from "@nestjs/common";
import { AgendaScheduleType } from "../enums";
import { AGENDA_MODULE_SCHEDULE } from "../agenda.constants";

const createScheduleDecorator =
  (type: AgendaScheduleType) => (when: Date | string) =>
    SetMetadata(AGENDA_MODULE_SCHEDULE, { type, when });

export const Every = createScheduleDecorator(AgendaScheduleType.Every);
export const Schedule = createScheduleDecorator(AgendaScheduleType.Schedule);
