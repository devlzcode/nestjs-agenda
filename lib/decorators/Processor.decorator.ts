import { Scope, SetMetadata, applyDecorators } from '@nestjs/common';
import { SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import { AGENDA_MODULE_PROCESSOR } from '../agenda.constants';

export const Processor = (scope?: Scope) =>
  applyDecorators(
    SetMetadata(AGENDA_MODULE_PROCESSOR, true),
    SetMetadata(SCOPE_OPTIONS_METADATA, { scope }),
  );
