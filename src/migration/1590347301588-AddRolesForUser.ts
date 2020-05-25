import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRolesForUser1590347301588 implements MigrationInterface {
    name = 'AddRolesForUser1590347301588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" text NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
    }

}
