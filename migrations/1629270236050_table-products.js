/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      on_sale BOOLEAN DEFAULT TRUE,
      name VARCHAR(50) NOT NULL,
      url VARCHAR(200) NOT NULL,
      description VARCHAR(240) NOT NULL,
      price DOUBLE PRECISION NOT NULL CHECK(price > 0),
      alcohol DOUBLE PRECISION NOT NULL,
      capacity DOUBLE PRECISION NOT NULL,
      manufacturer VARCHAR(70) NOT NULL,
      country_of_manufacturer VARCHAR(50) NOT NULL,
      categorie_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
      sub_categorie_id INTEGER REFERENCES sub_categories(id) ON DELETE SET NULL
    );

    CREATE INDEX ON products(on_sale);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE products;
    DROP INDEX products_on_sale_idx;
  `);
};
