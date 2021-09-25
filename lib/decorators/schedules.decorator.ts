import { applyDecorators, SetMetadata } from '@nestjs/common';
import { AgendaScheduleType } from '../enums';
import {
  AGENDA_SCHEDULE,
  AGENDA_SCHEDULE_TYPE,
  AGENDA_SCHEDULE_WHEN,
} from '../agenda.constants';

const createScheduleDecorator =
  (type: AgendaScheduleType) => (when: Date | string) => {
    return applyDecorators(
      SetMetadata(AGENDA_SCHEDULE, true),
      SetMetadata(AGENDA_SCHEDULE_WHEN, when),
      SetMetadata(AGENDA_SCHEDULE_TYPE, type),
    );
  };

export const Every = createScheduleDecorator(AgendaScheduleType.Every);
export const Schedule = createScheduleDecorator(AgendaScheduleType.Schedule);
