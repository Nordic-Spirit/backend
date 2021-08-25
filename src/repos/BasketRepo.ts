import { ModelRepo } from './ModelRepo';

export class BasketRepo extends ModelRepo {
  async insert(sessionId: string, productId: number) {
    const result = await this.query(
      `
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
    `,
      [sessionId, productId]
    );

    return result;
  }
}
