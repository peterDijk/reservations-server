import {MigrationInterface, QueryRunner} from "typeorm";

export class MemberUserToAccount11590448391481 implements MigrationInterface {
    name = 'MemberUserToAccount11590448391481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_accounts_accounts" ("users_id" integer NOT NULL, "accounts_id" integer NOT NULL, CONSTRAINT "PK_2446c9b8023acd7544efd7ac21a" PRIMARY KEY ("users_id", "accounts_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c67ef3d0e93a52e0751ed0f537" ON "users_accounts_accounts" ("users_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c5b39ff29269f7e658757413a" ON "users_accounts_accounts" ("accounts_id") `);
        await queryRunner.query(`ALTER TABLE "users_accounts_accounts" ADD CONSTRAINT "FK_c67ef3d0e93a52e0751ed0f5372" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_accounts_accounts" ADD CONSTRAINT "FK_5c5b39ff29269f7e658757413a3" FOREIGN KEY ("accounts_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_accounts_accounts" DROP CONSTRAINT "FK_5c5b39ff29269f7e658757413a3"`);
        await queryRunner.query(`ALTER TABLE "users_accounts_accounts" DROP CONSTRAINT "FK_c67ef3d0e93a52e0751ed0f5372"`);
        await queryRunner.query(`DROP INDEX "IDX_5c5b39ff29269f7e658757413a"`);
        await queryRunner.query(`DROP INDEX "IDX_c67ef3d0e93a52e0751ed0f537"`);
        await queryRunner.query(`DROP TABLE "users_accounts_accounts"`);
    }

}
