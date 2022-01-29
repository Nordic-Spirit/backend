const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class tableSubcategory1643406738713 {
  name = 'tableSubcategory1643406738713';

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'sub_categories',
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
            length: '30'
          },
          {
            name: 'description',
            type: 'varchar',
            length: '240',
            isNullable: true
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
          }
        ],
        foreignKeys: [
          {
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onDelete: 'cascade'
          }
        ],
        uniques: [
          {
            columnNames: ['id', 'category_id', 'name']
          }
        ]
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "sub_categories"`);
  }
};
