const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class tableSessions1643755015511 {
  name = 'tableSessions1643755015511';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "sessions" ("sid" character varying COLLATE "default" NOT NULL, "sess" json NOT NULL, "expire" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_e2d6172ca19b8ebef797c362b05" PRIMARY KEY ("sid"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_sessions_expire" ON "sessions" ("expire") `
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP INDEX "public"."idx_sessions_expire"`);
    await queryRunner.query(`DROP TABLE "sessions"`);
  }
};
