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
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url,
        p.description,
        p.price,
        p.alcohol,
        p.capacity,
        p.manufacturer,
        p.country_of_manufacturer,
        cat.id AS categorie_id,
        cat.name AS categorie_name,
        sc.id AS sub_categorie_id,
        sc.name AS sub_categorie_name
      FROM products AS p
      JOIN categories AS cat ON cat.id = p.categorie_id
      JOIN sub_categories AS sc ON sc.id = p.sub_categorie_id
      WHERE p.id = $1 AND p.on_sale = TRUE;
    `, [id]);
            return result;
        });
    }
    findLatest() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        products.id AS product_id,
        products.name AS product_name,
        products.url AS product_url,
        products.price AS product_price,
        categories.id AS categorie_id,
        categories.name AS categorie_name,
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
    findMostPopulars() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        products.id AS product_id,
        products.name AS product_name,
        products.url AS product_url,
        products.price AS product_price,
        categories.id AS categorie_id,
        categories.name AS categorie_name,
        (
          SELECT COUNT(*)
          FROM products_in_storages
          WHERE products_in_storages.product_id = products.id
        ) AS product_count
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
