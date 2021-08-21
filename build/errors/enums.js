"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseCodes = exports.ErrorNames = void 0;
var ErrorNames;
(function (ErrorNames) {
    ErrorNames["databaseError"] = "Database Error";
    ErrorNames["typeError"] = "Type Error";
})(ErrorNames = exports.ErrorNames || (exports.ErrorNames = {}));
var ErrorResponseCodes;
(function (ErrorResponseCodes) {
    ErrorResponseCodes[ErrorResponseCodes["_200"] = 200] = "_200";
    ErrorResponseCodes[ErrorResponseCodes["_201"] = 201] = "_201";
    ErrorResponseCodes[ErrorResponseCodes["_422"] = 422] = "_422";
})(ErrorResponseCodes = exports.ErrorResponseCodes || (exports.ErrorResponseCodes = {}));
