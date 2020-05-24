import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccountAndLocationModels1590332849475
  implements MigrationInterface {
  name = 'AddAccountAndLocationModels1590332849475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" SERIAL NOT NULL, "locationname" text NOT NULL, "capacity" text NOT NULL, "account_id" integer, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "accountname" text NOT NULL, "account_description" text, "administrator" text NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD CONSTRAINT "FK_18a15dc1faf8902c28bd42f2eca" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locations" DROP CONSTRAINT "FK_18a15dc1faf8902c28bd42f2eca"`,
    );
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TABLE "locations"`);
  }
}
