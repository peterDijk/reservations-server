import {MigrationInterface, QueryRunner} from "typeorm";

export class LocationColumns1590612291754 implements MigrationInterface {
    name = 'LocationColumns1590612291754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" ADD "advance_including_today" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "advance_days" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "advance_days"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "advance_including_today"`);
    }

}
