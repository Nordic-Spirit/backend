const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class shcemaInitilized1643553069789 {
  name = 'shcemaInitilized1643553069789';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "sub_categories" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "description" character varying(240), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "category_id" integer, CONSTRAINT "PK_f319b046685c0e07287e76c5ab1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "description" character varying(240), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "url" character varying(200) NOT NULL, "description" character varying(240) NOT NULL, "price" double precision NOT NULL, "alcohol" double precision NOT NULL, "capacity" double precision NOT NULL, "manufacturer" character varying(70) NOT NULL, "country_of_manufacturer" character varying(50) NOT NULL, "on_sale" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "category_id" integer, "sub_category_id" integer, CONSTRAINT "CHK_8913375cbfe31ae54a17a4520f" CHECK (price > 0), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4c9fb58de893725258746385e1" ON "products" ("name") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b9b8419fd8ba74c0a32f0bc85" ON "products" ("on_sale") `
    );
    await queryRunner.query(
      `CREATE TABLE "campaigns" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, "description" character varying(240) NOT NULL, "url_image" character varying(200) NOT NULL, "starts_at" TIMESTAMP WITH TIME ZONE NOT NULL, "ends_at" TIMESTAMP WITH TIME ZONE NOT NULL, "discount_percentage" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "CHK_181098ef72d713307ef8dfd9d7" CHECK (discount_percentage < 90 AND discount_percentage > 0), CONSTRAINT "CHK_6b24e0af580befac4ad2bd24df" CHECK (ends_at > starts_at), CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a0eedbd26052d3a1a2c41564a3" ON "campaigns" ("ends_at") `
    );
    await queryRunner.query(
      `CREATE TABLE "products_campaigns" ("product_id" integer NOT NULL, "campaign_id" integer NOT NULL, CONSTRAINT "PK_9297d6d58907d0f16aad491274d" PRIMARY KEY ("product_id", "campaign_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cb83d55c570a1fdd2537c5371b" ON "products_campaigns" ("product_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa11fad6bb0cd0794ba9b35404" ON "products_campaigns" ("campaign_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "sub_categories" ADD CONSTRAINT "FK_7a424f07f46010d3441442f7764" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_3fffb0be83ac483af3a55f41170" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" ADD CONSTRAINT "FK_cb83d55c570a1fdd2537c5371be" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "products_campaigns" ADD CONSTRAINT "FK_aa11fad6bb0cd0794ba9b354043" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`
    );
    await queryRunner.query(
      `ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_7a424f07f46010d3441442f7764"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aa11fad6bb0cd0794ba9b35404"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cb83d55c570a1fdd2537c5371b"`
    );
    await queryRunner.query(`DROP TABLE "products_campaigns"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a0eedbd26052d3a1a2c41564a3"`
    );
    await queryRunner.query(`DROP TABLE "campaigns"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b9b8419fd8ba74c0a32f0bc85"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c9fb58de893725258746385e1"`
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "sub_categories"`);
  }
};
