import { Injectable } from '@nestjs/common';
import { AgendaService } from '../../lib';

@Injectable()
export class AppService {
  constructor(private readonly agendaService: AgendaService) {}
  async repeatAfterMe() {
    await this.agendaService.now('repeatAfterMe', 'Goodbye world!');
  }
}
