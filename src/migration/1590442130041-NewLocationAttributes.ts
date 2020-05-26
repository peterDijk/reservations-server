import {MigrationInterface, QueryRunner} from "typeorm";

export class NewLocationAttributes1590442130041 implements MigrationInterface {
    name = 'NewLocationAttributes1590442130041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "time_units" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "capacity" integer NOT NULL, "location_id" integer, CONSTRAINT "PK_1d181aa75470f9703c615bd35e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "time_units" ADD CONSTRAINT "FK_3fbf59a907cea5766c7058cfb5c" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_units" DROP CONSTRAINT "FK_3fbf59a907cea5766c7058cfb5c"`);
        await queryRunner.query(`DROP TABLE "time_units"`);
    }

}
