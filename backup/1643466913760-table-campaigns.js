const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class tableCampaigns1643466913760 {
  name = 'tableCampaigns1643466913760';

  async up(queryRunner) {
    queryRunner.createTable(
      new Table({
        name: 'campaigns',
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
            length: '60'
          },
          {
            name: 'description',
            type: 'varchar',
            length: '240'
          },
          {
            name: 'url_image',
            type: 'varchar',
            length: '200'
          },
          {
            name: 'starts_at',
            type: 'timestamp with time zone'
          },
          {
            name: 'ends_at',
            type: 'timestamp with time zone'
          },
          {
            name: 'discount_percentage',
            type: 'integer'
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
          }
        ],
        checks: [
          {
            columnNames: ['discount_percentage'],
            expression: 'discount_percentage < 90 AND discount_percentage > 0'
          },
          {
            columnNames: ['ends_at', 'starts_at'],
            expression: 'ends_at > starts_at'
          }
        ],
        indices: [
          {
            columnNames: ['ends_at']
          }
        ]
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "campaigns"`);
  }
};
