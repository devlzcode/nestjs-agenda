import { Test } from "@nestjs/testing";
import { describe, it, expect, beforeAll } from "vitest";
import { AgendaService } from "../../lib";
import { AppModule } from "../src/app.module";
import { AppService } from "../src/app.service";

describe("Agenda", () => {
  let agendaService: AgendaService;
  let appService: AppService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    await module.init();
    agendaService = module.get(AgendaService);
    appService = module.get(AppService);
  });

  it(`should define sayHelloWorld`, () => {
    expect(agendaService._definitions["sayHelloWorld"]).toBeDefined();
  });

  it(`should define repeatAfterMe`, () => {
    expect(agendaService._definitions["repeatAfterMe"]).toBeDefined();
  });

  it(`should run "repeatAfterMe" immediately`, async () => {
    await appService.repeatAfterMe();
  });
});
