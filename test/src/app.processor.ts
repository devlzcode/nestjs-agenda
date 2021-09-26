import { Processor, Define, Schedule } from '../../lib';
import { AppService } from './app.service';

@Processor()
export class AppProcessor {
  constructor(private readonly appService: AppService) {}
  @Define('sayHelloWorld')
  @Schedule('in 10 seconds')
  public sayHelloWorld() {
    this.appService.sayHelloWorld();
  }
}
