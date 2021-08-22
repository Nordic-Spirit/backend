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
        c.id AS category_id,
        c.name AS category_name,
        sc.id AS sub_category_id,
        sc.name AS sub_category_name
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      JOIN sub_categories AS sc ON sc.id = p.sub_category_id
      WHERE p.id = $1 AND p.on_sale = TRUE;
    `, [id]);
            return result;
        });
    }
    findLatest() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        c.id AS category_id,
        c.name AS category_name,
        (
          SELECT COUNT(*)
          FROM products_in_storages AS pis
          WHERE pis.product_id = p.id
        ) AS product_count
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      WHERE p.on_sale = TRUE
      ORDER BY p.created_at DESC
      LIMIT 10;
    `);
            console.log('huhu');
            return result;
        });
    }
    findMostPopulars() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.url AS product_url,
        p.price AS product_price,
        c.id AS categorie_id,
        c.name AS categorie_name,
        (
          SELECT COUNT(*)
          FROM products_in_storages
          WHERE products_in_storages.product_id = p.id
        ) AS product_count
      FROM products AS p
      JOIN (
        SELECT
          orders_products.product_id,
          COUNT(*) AS products_sold
        FROM orders_products
        WHERE EXTRACT(DAY FROM CURRENT_TIMESTAMP - orders_products.created_at) < 60
        GROUP BY product_id
      ) AS op
      ON op.product_id = p.id
      JOIN categories AS c ON c.id = p.category_id
      ORDER BY op.products_sold DESC
      LIMIT 10;
    `);
            return result;
        });
    }
}
exports.ProductRepo = ProductRepo;
