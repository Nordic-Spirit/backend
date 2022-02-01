const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class tableBasketproducts1643757639076 {
    name = 'tableBasketproducts1643757639076'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "basket_products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "session_sid" character varying COLLATE "default", "product_id" integer, CONSTRAINT "PK_b6245f9f34546a14637d4deb7e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "basket_products" ADD CONSTRAINT "FK_63c0d010e9a425f522b768e797d" FOREIGN KEY ("session_sid") REFERENCES "sessions"("sid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basket_products" ADD CONSTRAINT "FK_343aa539c7d384591303590e0fd" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "basket_products" DROP CONSTRAINT "FK_343aa539c7d384591303590e0fd"`);
        await queryRunner.query(`ALTER TABLE "basket_products" DROP CONSTRAINT "FK_63c0d010e9a425f522b768e797d"`);
        await queryRunner.query(`DROP TABLE "basket_products"`);
    }
}
