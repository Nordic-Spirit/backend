const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tableOrder1643663711429 {
  name = 'tableOrders1643663711429';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "paid" boolean NOT NULL, "user_id" integer, "employee_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_f8a7411077c731327ca6e0b93b6" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_f8a7411077c731327ca6e0b93b6"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`
    );
    await queryRunner.query(`DROP TABLE "orders"`);
  }
};
