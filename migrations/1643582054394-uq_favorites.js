const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class uqFavorites1643582054394 {
  name = 'uqFavorites1643582054394';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_3fffb0be83ac483af3a55f41170"`
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "uq_favorites_userId_productId" UNIQUE ("user_id", "product_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_3fffb0be83ac483af3a55f41170" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_3fffb0be83ac483af3a55f41170"`
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "uq_favorites_userId_productId"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_3fffb0be83ac483af3a55f41170" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }
};
