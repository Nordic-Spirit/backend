const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class tableProduct1643409070394 {
  name = 'tableProduct1643409070394';

  async up(queryRunner) {
    queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'url',
            type: 'varchar',
            length: '200'
          },
          {
            name: 'description',
            type: 'varchar',
            length: '240'
          },
          {
            name: 'price',
            type: 'double precision'
          },
          {
            name: 'alcohol',
            type: 'double precision'
          },
          {
            name: 'capacity',
            type: 'double precision'
          },
          {
            name: 'manufacturer',
            type: 'varchar',
            length: '70'
          },
          {
            name: 'country_of_manufacturer',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'on_sale',
            type: 'boolean',
            default: 'true'
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'current_timestamp'
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'current_timestamp'
          },
          {
            name: 'category_id',
            type: 'integer'
          },
          {
            name: 'sub_category_id',
            type: 'integer'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onDelete: 'restrict'
          },
          {
            columnNames: ['sub_category_id'],
            referencedTableName: 'sub_categories',
            referencedColumnNames: ['id'],
            onDelete: 'set null'
          }
        ],
        checks: [
          {
            columnNames: ['price'],
            expression: 'price > 0'
          }
        ],
        indices: [
          {
            columnNames: ['on_sale']
          },
          {
            columnNames: ['name']
          }
        ]
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "products"`);
  }
};
