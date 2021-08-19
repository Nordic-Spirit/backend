import { ErrorNames } from './ErrorNames';

export class CustomError {
  constructor(
    public message: string,
    public name: ErrorNames,
    public responseCode: number
  ) {}

  log() {
    console.log({
      name: this.name,
      message: this.message,
      responseCode: this.responseCode
    });
    console.log();
  }
}
