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
exports.BasketRepo = void 0;
const ModelRepo_1 = require("./ModelRepo");
class BasketRepo extends ModelRepo_1.ModelRepo {
    insert(sessionId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      INSERT INTO
        products_shopping_baskets (shopping_basket_sid, product_id)
      VALUES (
        $1,
        (
          SELECT id
          FROM products
          WHERE id = $2 AND on_sale = TRUE
        )
      ) RETURNING *;
    `, [sessionId, productId]);
            return result;
        });
    }
}
exports.BasketRepo = BasketRepo;
