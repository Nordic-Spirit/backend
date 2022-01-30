const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tablesLocationsAndUsers1643559747767 {
  name = 'tablesLocationsAndUsers1643559747767';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" SERIAL NOT NULL, "country" character varying(50), "city" character varying(85), "postal_code" character varying(12), "address" character varying(85), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(30), "last_name" character varying(50), "phone" character varying(25), "email" character varying(100) NOT NULL, "password_hash" character varying(150) NOT NULL, "password_salt" character varying(150) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "location_id" integer, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_1523fb2aebce55b9e820122ee0" UNIQUE ("location_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1523fb2aebce55b9e820122ee0e" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1523fb2aebce55b9e820122ee0e"`
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "locations"`);
  }
};
