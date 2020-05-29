import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInvitationRequiredAccount1590699621813 implements MigrationInterface {
    name = 'AddInvitationRequiredAccount1590699621813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "invitation_required" TO "invitation_token"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "invitation_token"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "invitation_token" text DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "invitation_token"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "invitation_token" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "invitation_token" TO "invitation_required"`);
    }

}
