import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AgendaService } from '../../lib';
import { AppModule } from '../src/app.module';

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

  it(`should define sayHelloWorld`, (done) => {
    expect(agendaService._definitions['sayHelloWorld']).toBeDefined();
    setTimeout(done, 2500);
  });

  afterAll(async () => {
    await app.close();
  });
});
