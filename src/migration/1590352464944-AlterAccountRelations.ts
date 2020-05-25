import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterAccountRelations1590352464944 implements MigrationInterface {
    name = 'AlterAccountRelations1590352464944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "administrator" TO "administrator_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_admin"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_super_admin"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "administrator_id"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "administrator_id" integer`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_03e4fccb1f6df7ab504a3a8e8fd" FOREIGN KEY ("administrator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_03e4fccb1f6df7ab504a3a8e8fd"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "administrator_id"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "administrator_id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_super_admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "administrator_id" TO "administrator"`);
    }

}
