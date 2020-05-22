import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1590153607289 implements MigrationInterface {
    name = 'Init1590153607289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "message" text NOT NULL, "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" text NOT NULL, "first_name" text, "last_name" text, "email" text NOT NULL, "password" text NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "is_super_admin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
