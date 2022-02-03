const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tableStorages1643831614510 {
  name = 'tableStorages1643831614510';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "storages" ("country" character varying(50), "city" character varying(85), "postal_code" character varying(12), "address" character varying(85), "id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2f2d2fae6dc214f7f3ec52189ce" PRIMARY KEY ("id"))`
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "storages"`);
  }
};
