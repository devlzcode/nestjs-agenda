import { Injectable } from '@nestjs/common';
import { Define, Schedule } from '../../lib';

@Injectable()
export class AppService {
  @Define('sayHelloWorld')
  @Schedule('in 10 seconds')
  public sayHelloWorld() {
    console.log('Hello World!');
  }
}
