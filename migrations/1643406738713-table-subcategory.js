const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class tableSubcategory1643406738713 {
  name = 'tableSubcategory1643406738713';

  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'subcategory',
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
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'current_timestamp'
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'current_timestamp'
          },
          {
            name: 'categoryId',
            type: 'integer'
          }
        ],
        foreignKeys: [
          {
            name: 'subcategory',
            columnNames: ['categoryId'],
            referencedTableName: 'category',
            referencedColumnNames: ['id'],
            onDelete: 'cascade'
          }
        ],
        uniques: [
          {
            name: 'unique id + categoryId + name',
            columnNames: ['id', 'categoryId', 'name']
          }
        ]
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "sub_category"`);
  }
};
