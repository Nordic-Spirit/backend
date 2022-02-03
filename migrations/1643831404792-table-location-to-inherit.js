const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tableLocationToInherit1643831404792 {
  name = 'tableLocationToInherit1643831404792';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_0a20efaa3d1b8c73427c3e68dfa"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1523fb2aebce55b9e820122ee0e"`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "REL_0a20efaa3d1b8c73427c3e68df"`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "location_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "REL_1523fb2aebce55b9e820122ee0"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "location_id"`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "country" character varying(50)`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "city" character varying(85)`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "postal_code" character varying(12)`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "address" character varying(85)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "country" character varying(50)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "city" character varying(85)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "postal_code" character varying(12)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "address" character varying(85)`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "postal_code"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address"`);
    await queryRunner.query(
      `ALTER TABLE "employees" DROP COLUMN "postal_code"`
    );
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "country"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "location_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "REL_1523fb2aebce55b9e820122ee0" UNIQUE ("location_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "location_id" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "REL_0a20efaa3d1b8c73427c3e68df" UNIQUE ("location_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1523fb2aebce55b9e820122ee0e" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0a20efaa3d1b8c73427c3e68dfa" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
};
