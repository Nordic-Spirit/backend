/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE shopping_baskets (
      sid VARCHAR NOT NULL COLLATE "default",
      sess JSON NOT NULL,
      expire TIMESTAMP WITH TIME ZONE NOT NULL
    )
    WITH (OIDS=FALSE);
    
    ALTER TABLE shopping_baskets ADD CONSTRAINT shopping_basket_pkey PRIMARY KEY(sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
    
    CREATE INDEX ON shopping_baskets(expire);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE shopping_baskets;
  `);
};
