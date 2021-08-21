import { ModelRepo } from './ModelRepo';
import { CampaignDiscount } from './interfaces/Campaigns';

export class CampaignRepo extends ModelRepo {
  async findDiscounts(): Promise<CampaignDiscount[]> {
    const result = await this.query<CampaignDiscount>(`
      SELECT
        pc.product_id,
        c.discount_percentage
      FROM campaigns AS c
      JOIN products_campaigns AS pc ON pc.campaign_id = c.id
      WHERE c.ends_at > CURRENT_TIMESTAMP;
    `);

    return result;
  }

  async findByProductId(id: number): Promise<CampaignDiscount[]> {
    const result = await this.query<CampaignDiscount>(
      `
      SELECT
        pc.product_id,
        c.discount_percentage
      FROM campaigns AS c
      JOIN products_campaigns AS pc ON pc.campaign_id = c.id
      WHERE pc.product_id = $1
      ORDER BY c.discount_percentage DESC
      LIMIT 1;
    `,
      [id]
    );

    // TODO if result is empty return CustomError
    return result;
  }
}
