import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInvitationRequiredAccount1590699062740 implements MigrationInterface {
    name = 'AddInvitationRequiredAccount1590699062740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "invitation_required" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "invitation_required"`);
    }

}
