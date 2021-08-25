/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE products_shopping_baskets (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      shopping_basket_sid VARCHAR NOT NULL REFERENCES shopping_baskets(sid) ON DELETE CASCADE,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT
    );
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE products_shopping_baskets;
  `);
};

// shopping_basket_id INTEGER NOT NULL REFERENCES shopping_baskets(id)
