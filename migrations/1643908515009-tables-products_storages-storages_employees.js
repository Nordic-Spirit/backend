const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class tablesProductsStoragesStoragesEmployees1643908515009 {
    name = 'tablesProductsStoragesStoragesEmployees1643908515009'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "storages_employees" ("storage_id" integer NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "PK_58aba2005a9fd5b8a70e1658c97" PRIMARY KEY ("storage_id", "employee_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ceb009c9ff99deb211b9d86804" ON "storages_employees" ("storage_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5b9dfcb8151fb75c560d0b6adf" ON "storages_employees" ("employee_id") `);
        await queryRunner.query(`CREATE TABLE "products_storages" ("product_id" integer NOT NULL, "storage_id" integer NOT NULL, CONSTRAINT "PK_9961c965d817c1ddfa02c01fb39" PRIMARY KEY ("product_id", "storage_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_615a0663cb7a23b6c190478bab" ON "products_storages" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_382d28c2050dd159c34bd0414c" ON "products_storages" ("storage_id") `);
        await queryRunner.query(`ALTER TABLE "storages_employees" ADD CONSTRAINT "FK_ceb009c9ff99deb211b9d868040" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "storages_employees" ADD CONSTRAINT "FK_5b9dfcb8151fb75c560d0b6adfc" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_storages" ADD CONSTRAINT "FK_615a0663cb7a23b6c190478babd" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_storages" ADD CONSTRAINT "FK_382d28c2050dd159c34bd0414cc" FOREIGN KEY ("storage_id") REFERENCES "storages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products_storages" DROP CONSTRAINT "FK_382d28c2050dd159c34bd0414cc"`);
        await queryRunner.query(`ALTER TABLE "products_storages" DROP CONSTRAINT "FK_615a0663cb7a23b6c190478babd"`);
        await queryRunner.query(`ALTER TABLE "storages_employees" DROP CONSTRAINT "FK_5b9dfcb8151fb75c560d0b6adfc"`);
        await queryRunner.query(`ALTER TABLE "storages_employees" DROP CONSTRAINT "FK_ceb009c9ff99deb211b9d868040"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_382d28c2050dd159c34bd0414c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_615a0663cb7a23b6c190478bab"`);
        await queryRunner.query(`DROP TABLE "products_storages"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b9dfcb8151fb75c560d0b6adf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ceb009c9ff99deb211b9d86804"`);
        await queryRunner.query(`DROP TABLE "storages_employees"`);
    }
}
