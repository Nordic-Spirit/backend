const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class tableProduct1643409070394 {
  name = 'tableProduct1643409070394';

  async up(queryRunner) {
    queryRunner.createTable(
      new Table({
        columns: []
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "product"`);
  }
};
