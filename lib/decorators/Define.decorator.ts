import { applyDecorators, SetMetadata } from '@nestjs/common';
import { DefineOptions } from 'agenda';
import {
  AGENDA_PROCESSOR,
  AGENDA_PROCESSOR_NAME,
  AGENDA_PROCESSOR_OPTIONS,
} from '../agenda.constants';

export const Define = (name: string, options?: DefineOptions) => {
  return applyDecorators(
    SetMetadata(AGENDA_PROCESSOR, true),
    SetMetadata(AGENDA_PROCESSOR_NAME, name),
    SetMetadata(AGENDA_PROCESSOR_OPTIONS, options),
  );
};
