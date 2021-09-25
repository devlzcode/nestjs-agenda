import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AgendaService } from '../../lib';
import { AppModule } from '../src/app.module';

describe('Agenda', () => {
  let app: INestApplication;
  let agendaService: AgendaService;

  beforeEach(async () => {
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

  afterEach(async () => {
    await app.close();
  });
});
