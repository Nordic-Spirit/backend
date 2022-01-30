const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class uniqueSubCategories1643553960848 {
  name = 'uniqueSubCategories1643553960848';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "sub_categories" ADD CONSTRAINT "UQ" UNIQUE ("id", "name", "category_id")`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "sub_categories" DROP CONSTRAINT "UQ"`
    );
  }
};
