import { Injectable } from '@nestjs/common';
import { Define } from '../../lib';

@Injectable()
export class AppService {
  @Define('sayHelloWorld')
  public sayHelloWorld() {
    console.log('Hello World!');
  }
}
