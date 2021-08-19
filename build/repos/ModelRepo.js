"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelRepo = void 0;
const pool_1 = __importDefault(require("../config/pool"));
const CustomError_1 = require("../errors/CustomError");
const ErrorNames_1 = require("../errors/ErrorNames");
class ModelRepo {
    static query(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool_1.default.connect();
            return pool_1.default
                .query(sql, params)
                .then(({ rows }) => {
                return rows;
            })
                .catch(err => {
                return new CustomError_1.CustomError(err.message, ErrorNames_1.ErrorNames.databaseError, 422);
            })
                .finally(() => {
                client.release();
            });
        });
    }
}
exports.ModelRepo = ModelRepo;
