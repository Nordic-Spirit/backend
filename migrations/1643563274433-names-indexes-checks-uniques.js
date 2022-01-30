const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class namesIndexesChecksUniques1643563274433 {
    name = 'namesIndexesChecksUniques1643563274433'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_4c9fb58de893725258746385e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b9b8419fd8ba74c0a32f0bc85"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0eedbd26052d3a1a2c41564a3"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "CHK_8913375cbfe31ae54a17a4520f"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "CHK_181098ef72d713307ef8dfd9d7"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "CHK_6b24e0af580befac4ad2bd24df"`);
        await queryRunner.query(`ALTER TABLE "sub_categories" DROP CONSTRAINT "UQ"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`CREATE INDEX "idx_products_name" ON "products" ("name") `);
        await queryRunner.query(`CREATE INDEX "idx_products_onSale" ON "products" ("on_sale") `);
        await queryRunner.query(`CREATE INDEX "idx_campaigns_endsAt" ON "campaigns" ("ends_at") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "uidx_users_email" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "chk_products_price" CHECK (price > 0)`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "chk_campaigns_discountPercentage" CHECK (discount_percentage < 90 AND discount_percentage > 0)`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "chk_campaigns_endsAt_startsAt" CHECK (ends_at > starts_at)`);
        await queryRunner.query(`ALTER TABLE "sub_categories" ADD CONSTRAINT "uq_subCategories_id_name_categoryId" UNIQUE ("id", "name", "category_id")`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub_categories" DROP CONSTRAINT "uq_subCategories_id_name_categoryId"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "chk_campaigns_endsAt_startsAt"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "chk_campaigns_discountPercentage"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "chk_products_price"`);
        await queryRunner.query(`DROP INDEX "public"."uidx_users_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_campaigns_endsAt"`);
        await queryRunner.query(`DROP INDEX "public"."idx_products_onSale"`);
        await queryRunner.query(`DROP INDEX "public"."idx_products_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "sub_categories" ADD CONSTRAINT "UQ" UNIQUE ("id", "name", "category_id")`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "CHK_6b24e0af580befac4ad2bd24df" CHECK ((ends_at > starts_at))`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "CHK_181098ef72d713307ef8dfd9d7" CHECK (((discount_percentage < 90) AND (discount_percentage > 0)))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "CHK_8913375cbfe31ae54a17a4520f" CHECK ((price > (0)::double precision))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0eedbd26052d3a1a2c41564a3" ON "campaigns" ("ends_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b9b8419fd8ba74c0a32f0bc85" ON "products" ("on_sale") `);
        await queryRunner.query(`CREATE INDEX "IDX_4c9fb58de893725258746385e1" ON "products" ("name") `);
    }
}
