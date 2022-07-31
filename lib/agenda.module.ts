import { Module, OnApplicationShutdown } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ConfigurableModuleClass } from "./agenda.module-definition";
import { AgendaService } from "./agenda.service";

@Module({})
export class AgendaModule
  extends ConfigurableModuleClass
  implements OnApplicationShutdown
{
  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  async onApplicationShutdown() {
    const agendaService = this.moduleRef.get(AgendaService);
    await agendaService.stop();
    await agendaService.close();
  }
}
