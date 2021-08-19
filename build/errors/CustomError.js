"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(message, name, responseCode) {
        this.message = message;
        this.name = name;
        this.responseCode = responseCode;
    }
    log() {
        console.log({
            name: this.name,
            message: this.message,
            responseCode: this.responseCode
        });
        console.log();
    }
}
exports.CustomError = CustomError;
