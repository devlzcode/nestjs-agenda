import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayHelloWorld() {
    console.log('Hello World!');
  }
}
