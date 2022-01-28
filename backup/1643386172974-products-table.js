const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class productsTable1643386172974 {
  name = 'productsTable1643386172974';

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'current_timestamp'
          },
          {
            name: 'on_sale',
            type: 'boolean',
            default: 'true'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'price',
            type: 'double precision'
          }
        ],
        checks: [
          {
            name: 'price validation',
            columnNames: 'price',
            expression: 'price > 0'
          }
        ]
      })
    );
    // await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "alcohol" integer NOT NULL, "capacity" integer NOT NULL, "manufacturer" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "product"`);
  }
};
