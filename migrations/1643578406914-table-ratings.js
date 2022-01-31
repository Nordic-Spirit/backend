const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tableRatings1643578406914 {
  name = 'tableRatings1643578406914';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_3fffb0be83ac483af3a55f41170"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" DROP CONSTRAINT "FK_cb83d55c570a1fdd2537c5371be"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" DROP CONSTRAINT "FK_aa11fad6bb0cd0794ba9b354043"`
    );
    await queryRunner.query(
      `CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "stars" integer NOT NULL, "description" character varying(240), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "product_id" integer, CONSTRAINT "uq_ratings" UNIQUE ("user_id", "product_id"), CONSTRAINT "chk_ratings_stars" CHECK (stars >= 1 AND stars <= 5), CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_f49ef8d0914a14decddbb170f2f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" ADD CONSTRAINT "FK_a3ec70bc6ddcdefb6c415bb05b8" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_3fffb0be83ac483af3a55f41170" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" ADD CONSTRAINT "FK_cb83d55c570a1fdd2537c5371be" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" ADD CONSTRAINT "FK_aa11fad6bb0cd0794ba9b354043" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" DROP CONSTRAINT "FK_aa11fad6bb0cd0794ba9b354043"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" DROP CONSTRAINT "FK_cb83d55c570a1fdd2537c5371be"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_3fffb0be83ac483af3a55f41170"`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_a3ec70bc6ddcdefb6c415bb05b8"`
    );
    await queryRunner.query(
      `ALTER TABLE "ratings" DROP CONSTRAINT "FK_f49ef8d0914a14decddbb170f2f"`
    );
    await queryRunner.query(`DROP TABLE "ratings"`);
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" ADD CONSTRAINT "FK_aa11fad6bb0cd0794ba9b354043" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" ADD CONSTRAINT "FK_cb83d55c570a1fdd2537c5371be" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_3fffb0be83ac483af3a55f41170" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
};
