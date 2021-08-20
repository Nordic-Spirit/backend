import { ErrorNames } from './ErrorNames';

export class CustomError {
  constructor(
    public message: string,
    public name: ErrorNames,
    public sqlErrorCode: string,
    public responseCode: number
  ) {}

  log() {
    // TODO In this method we will log errors to somewhere
    console.log({
      name: this.name,
      message: this.message,
      sqlErrorCode: this.sqlErrorCode,
      responseCode: this.responseCode
    });
  }
}
