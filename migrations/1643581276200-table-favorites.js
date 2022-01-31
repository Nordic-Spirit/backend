const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tableFavorite1643581276200 {
  name = 'tableFavorite1643581276200';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "product_id" integer, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_003e599a9fc0e8f154b6313639f" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_003e599a9fc0e8f154b6313639f"`
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593"`
    );
    await queryRunner.query(`DROP TABLE "favorites"`);
  }
};
