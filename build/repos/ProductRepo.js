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
    // TODO KESKEN
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
    // TODO KESKEN
    findById(id) {
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
      FROM product
      JOIN categories ON categories.id = products.categorie_id
      WHERE products.on_sale = TRUE
      ORDER BY products.created_at DESC
      LIMIT 10;
    `);
            return result;
        });
    }
    findMostPopulars() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        products.id AS product_id,
        products.name AS product_name,
        products.url,
        products.price,
        categories.id AS categorie_id,
        categories.name AS categorie_name,
        op.products_sold
      FROM products
      JOIN (
        SELECT
          orders_products.product_id,
          COUNT(*) AS products_sold
        FROM orders_products
        WHERE EXTRACT(DAY FROM CURRENT_TIMESTAMP - orders_products.created_at) < 60
        GROUP BY product_id
      ) AS op
      ON op.product_id = products.id
      JOIN categories ON categories.id = products.categorie_id
      ORDER BY op.products_sold DESC
      LIMIT 10;
    `);
            return result;
        });
    }
}
exports.ProductRepo = ProductRepo;
