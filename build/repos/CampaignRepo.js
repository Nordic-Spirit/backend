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
exports.CampaignRepo = void 0;
const ModelRepo_1 = require("./ModelRepo");
class CampaignRepo extends ModelRepo_1.ModelRepo {
    findDiscounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        pc.product_id,
        c.discount_percentage
      FROM campaigns AS c
      JOIN products_campaigns AS pc ON pc.campaign_id = c.id
      WHERE c.ends_at > CURRENT_TIMESTAMP;
    `);
            return result;
        });
    }
    findByProductId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(`
      SELECT
        pc.product_id,
        c.discount_percentage
      FROM campaigns AS c
      JOIN products_campaigns AS pc ON pc.campaign_id = c.id
      WHERE c.ends_at < CURRENT_TIMESTAMP AND pc.product_id = $1
      ORDER BY c.discount_percentage DESC
      LIMIT 1;
    `, [id]);
            // TODO if result is empty return CustomError
            return result;
        });
    }
}
exports.CampaignRepo = CampaignRepo;
