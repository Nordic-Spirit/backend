const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class columnRole1643651445981 {
  name = 'columnRole1643651445981';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TYPE "public"."EMPLOYEE_ROLE" AS ENUM('standard', 'admin')`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "role" "public"."EMPLOYEE_ROLE" NOT NULL DEFAULT 'standard'`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."EMPLOYEE_ROLE"`);
  }
};
