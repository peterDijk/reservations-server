import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvitationTokenDefault1590772616064 implements MigrationInterface {
  name = 'Needed1590772616064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ALTER COLUMN "invitation_token" SET DEFAULT null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ALTER COLUMN "invitation_token" DROP DEFAULT`,
    );
  }
}
