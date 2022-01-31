const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class ondeleteCascadeAddedForRelationWithLocation1643649573511 {
  name = 'ondeleteCascadeAddedForRelationWithLocation1643649573511';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1523fb2aebce55b9e820122ee0e"`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_0a20efaa3d1b8c73427c3e68dfa"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1523fb2aebce55b9e820122ee0e" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0a20efaa3d1b8c73427c3e68dfa" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_0a20efaa3d1b8c73427c3e68dfa"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1523fb2aebce55b9e820122ee0e"`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0a20efaa3d1b8c73427c3e68dfa" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1523fb2aebce55b9e820122ee0e" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
};
