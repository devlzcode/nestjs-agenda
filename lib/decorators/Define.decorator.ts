import { SetMetadata } from "@nestjs/common";
import { DefineOptions } from "agenda";
import { AGENDA_MODULE_DEFINITION } from "../agenda.constants";

export const Define = (name: string, options: DefineOptions = {}) =>
  SetMetadata(AGENDA_MODULE_DEFINITION, { name, options });
