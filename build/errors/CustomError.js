"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(message, name, sqlErrorCode, responseCode) {
        this.message = message;
        this.name = name;
        this.sqlErrorCode = sqlErrorCode;
        this.responseCode = responseCode;
    }
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
exports.CustomError = CustomError;
