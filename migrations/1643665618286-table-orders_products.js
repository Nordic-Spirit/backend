const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tableOrdersProducts1643665618286 {
  name = 'tableOrdersProducts1643665618286';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "orders_products" ("order_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_dccc0235a657d56137dcf501933" PRIMARY KEY ("order_id", "product_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_266b0df20b9e4423bc9da1bbdc" ON "orders_products" ("order_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_beb618ce6dae64b9d817394ebd" ON "orders_products" ("product_id") `
    );
    await queryRunner.query(
      `CREATE TYPE "public"."DELIVERY_STATUS" AS ENUM('processing', 'cancelled', 'shipped', 'delivered', 'returned')`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "deliverStatus" "public"."DELIVERY_STATUS" NOT NULL DEFAULT 'processing'`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1"`
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "deliverStatus"`);
    await queryRunner.query(`DROP TYPE "public"."DELIVERY_STATUS"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_beb618ce6dae64b9d817394ebd"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_266b0df20b9e4423bc9da1bbdc"`
    );
    await queryRunner.query(`DROP TABLE "orders_products"`);
  }
};
