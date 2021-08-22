import { ModelRepo } from './ModelRepo';
import { ProductDiscount } from '../interfaces/Campaigns';

export class CampaignRepo extends ModelRepo {
  async findDiscounts(): Promise<ProductDiscount[]> {
    const result = await this.query<ProductDiscount>(`
      SELECT
        pc.product_id,
        c.discount_percentage
      FROM campaigns AS c
      JOIN products_campaigns AS pc ON pc.campaign_id = c.id
      WHERE c.ends_at > CURRENT_TIMESTAMP;
    `);

    return result;
  }

  async findByProductId(id: number): Promise<ProductDiscount[]> {
    const result = await this.query<ProductDiscount>(
      `
      SELECT
        pc.product_id,
        c.discount_percentage
      FROM campaigns AS c
      JOIN products_campaigns AS pc ON pc.campaign_id = c.id
      WHERE c.ends_at < CURRENT_TIMESTAMP AND pc.product_id = $1
      ORDER BY c.discount_percentage DESC
      LIMIT 1;
    `,
      [id]
    );

    // TODO if result is empty return CustomError
    return result;
  }
}
