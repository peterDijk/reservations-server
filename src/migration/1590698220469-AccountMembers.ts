import {MigrationInterface, QueryRunner} from "typeorm";

export class AccountMembers1590698220469 implements MigrationInterface {
    name = 'AccountMembers1590698220469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_admin_accounts_accounts" ("users_id" integer NOT NULL, "accounts_id" integer NOT NULL, CONSTRAINT "PK_a78e4d8578bc2f5ce9aa207583d" PRIMARY KEY ("users_id", "accounts_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dfc904e25a6291d7ab39fb5fbf" ON "users_admin_accounts_accounts" ("users_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1169e85c6184807c9330ec1972" ON "users_admin_accounts_accounts" ("accounts_id") `);
        await queryRunner.query(`ALTER TABLE "users_admin_accounts_accounts" ADD CONSTRAINT "FK_dfc904e25a6291d7ab39fb5fbf1" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_admin_accounts_accounts" ADD CONSTRAINT "FK_1169e85c6184807c9330ec1972e" FOREIGN KEY ("accounts_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_admin_accounts_accounts" DROP CONSTRAINT "FK_1169e85c6184807c9330ec1972e"`);
        await queryRunner.query(`ALTER TABLE "users_admin_accounts_accounts" DROP CONSTRAINT "FK_dfc904e25a6291d7ab39fb5fbf1"`);
        await queryRunner.query(`DROP INDEX "IDX_1169e85c6184807c9330ec1972"`);
        await queryRunner.query(`DROP INDEX "IDX_dfc904e25a6291d7ab39fb5fbf"`);
        await queryRunner.query(`DROP TABLE "users_admin_accounts_accounts"`);
    }

}
