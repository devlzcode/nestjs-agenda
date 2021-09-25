import { Module } from '@nestjs/common';
import { AgendaModule } from '../../lib';
import { AppService } from './app.service';

@Module({
  imports: [
    AgendaModule.forRoot({
      db: { address: 'mongodb://localhost/agenda' },
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
