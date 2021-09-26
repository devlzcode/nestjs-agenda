import { Module } from '@nestjs/common';
import { AgendaModule } from '../../lib';
import { AppService } from './app.service';
import { AppProcessor } from './app.processor';
import { AgendaConfig } from 'agenda';

const opts: AgendaConfig = {
  db: {
    address: 'mongodb://localhost/agenda',
  },
};

@Module({
  imports: [AgendaModule.forRoot(opts)],
  providers: [AppService, AppProcessor],
})
export class AppModule {}
