import { Job } from "agenda";
import { Processor, Define, Schedule } from "../../lib";

@Processor()
export class AppProcessor {
  @Define("sayHelloWorld")
  @Schedule("in 10 seconds")
  public sayHelloWorld() {
    console.log("Hello world!");
  }

  @Define("repeatAfterMe")
  public repeatAfterMe(job: Job) {
    console.log(job.attrs.data);
  }

  public shouldntError() {}
}
