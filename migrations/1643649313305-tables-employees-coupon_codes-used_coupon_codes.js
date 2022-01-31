const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tablesEmployeesCouponCodesUsedCouponCodes1643649313305 {
  name = 'tablesEmployeesCouponCodesUsedCouponCodes1643649313305';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "coupon_codes" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying, "discount_percentage" integer NOT NULL, "expirty_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "chk_couponCodes_discountPercentage" CHECK (discount_percentage > 0 AND discount_percentage < 99), CONSTRAINT "PK_5ac86428f1fa43972e1ea4a23e0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_couponcodes_expiryDate" ON "coupon_codes" ("expirty_date") `
    );
    await queryRunner.query(
      `CREATE TABLE "used_coupon_code" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "coupon_code" integer, "used_coupon_code_id" integer, CONSTRAINT "PK_d76b4bf02d38a3239e777d25454" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("id" SERIAL NOT NULL, "first_name" character varying(30) NOT NULL, "last_name" character varying(50) NOT NULL, "phone" character varying(25) NOT NULL, "email" character varying(100) NOT NULL, "passwordHash" character varying(150) NOT NULL, "passwordSalt" character varying(150) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "location_id" integer, CONSTRAINT "uq_employees_email" UNIQUE ("email"), CONSTRAINT "uq_employees_phone" UNIQUE ("phone"), CONSTRAINT "REL_0a20efaa3d1b8c73427c3e68df" UNIQUE ("location_id"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "used_coupon_code" ADD CONSTRAINT "FK_13c0e83a699ddf818a567e9a776" FOREIGN KEY ("coupon_code") REFERENCES "coupon_codes"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "used_coupon_code" ADD CONSTRAINT "FK_5256e15f23155c42b5f2ab1beb5" FOREIGN KEY ("used_coupon_code_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_0a20efaa3d1b8c73427c3e68dfa" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_0a20efaa3d1b8c73427c3e68dfa"`
    );
    await queryRunner.query(
      `ALTER TABLE "used_coupon_code" DROP CONSTRAINT "FK_5256e15f23155c42b5f2ab1beb5"`
    );
    await queryRunner.query(
      `ALTER TABLE "used_coupon_code" DROP CONSTRAINT "FK_13c0e83a699ddf818a567e9a776"`
    );
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TABLE "used_coupon_code"`);
    await queryRunner.query(`DROP INDEX "public"."idx_couponcodes_expiryDate"`);
    await queryRunner.query(`DROP TABLE "coupon_codes"`);
  }
};
