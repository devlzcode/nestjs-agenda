import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AgendaService } from '../../lib';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';

describe('Agenda', () => {
  let app: INestApplication;
  let agendaService: AgendaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    agendaService = app.get<AgendaService>(AgendaService);
  });

  it(`should define sayHelloWorld`, () => {
    expect(agendaService._definitions['sayHelloWorld']).toBeDefined();
  });

  it(`should define repeatAfterMe`, () => {
    expect(agendaService._definitions['repeatAfterMe']).toBeDefined();
  });

  it(`should run "repeatAfterMe" immediately`, async () => {
    const appService = app.get<AppService>(AppService);
    await appService.repeatAfterMe();
  });

  afterAll(async () => {
    await app.close();
  });
});
