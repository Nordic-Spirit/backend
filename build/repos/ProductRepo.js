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
exports.ProductRepo = void 0;
const pool_1 = __importDefault(require("../config/pool"));
const ModelRepo_1 = require("./ModelRepo");
class ProductRepo extends ModelRepo_1.ModelRepo {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool_1.default.connect();
            const { rows } = yield pool_1.default.query(`
      SELECT * FROM products;
    `);
            client.release();
            return 'Toimii';
        });
    }
    static findLatest() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT created_at
      FROM products
      ORDER BY created_at DESC
      LIMIT 10;
    `);
            return result;
        });
    }
}
exports.ProductRepo = ProductRepo;
