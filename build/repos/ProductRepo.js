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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepo = void 0;
const ModelRepo_1 = require("./ModelRepo");
class ProductRepo extends ModelRepo_1.ModelRepo {
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
      LIMIT 20
    `);
            return result;
        });
    }
    findById() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    findLatest() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        products.id as product_id,
        products.name as product_name,
        products.url,
        products.price,
        categories.id as categorie_id,
        categories.name as categorie_name,
        (
          SELECT COUNT(*)
          FROM products_in_storages
          WHERE products_in_storages.product_id = products.id
        ) AS product_count
      FROM products
      JOIN categories ON categories.id = products.categorie_id
      WHERE products.on_sale = TRUE
      ORDER BY products.created_at DESC
      LIMIT 10;
    `);
            return result;
        });
    }
}
exports.ProductRepo = ProductRepo;
