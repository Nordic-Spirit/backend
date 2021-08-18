/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE campaigns (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      name VARCHAR(40) NOT NULL,
      description VARCHAR(240) NOT NULL,
      url_image VARCHAR(200) NOT NULL,
      starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
      ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
      discount_percentage INTEGER NOT NULL
    );
    
    CREATE INDEX ON campaigns(ends_at);
  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE campaigns;
  `);
};
