import type { FactoryProvider } from "@nestjs/common";
import type { AgendaModuleOptions } from "./interfaces";
import { AgendaService } from "./agenda.service";
import { MODULE_OPTIONS_TOKEN } from "./agenda.module-definition";

export const createAgendaServiceProvider = (): FactoryProvider => {
  return {
    provide: AgendaService,
    useFactory: async (options: AgendaModuleOptions) => {
      const agendaService = new AgendaService(options);
      await agendaService.start();
      return agendaService;
    },
    inject: [MODULE_OPTIONS_TOKEN],
  };
};
