import { ErrorNames } from './';

export class CustomError {
  constructor(
    public message: string,
    public name: ErrorNames,
    public sqlErrorCode?: string
  ) {}

  log() {
    // TODO In this method we will log errors to somewhere
    console.log({
      name: this.name,
      message: this.message,
      sqlErrorCode: this.sqlErrorCode
    });
  }
}
