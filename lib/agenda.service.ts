import { Agenda } from 'agenda';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AgendaService extends Agenda {}
