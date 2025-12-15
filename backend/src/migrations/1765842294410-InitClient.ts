import { MigrationInterface, QueryRunner } from "typeorm";

export class InitClient1765842294410 implements MigrationInterface {
    name = 'InitClient1765842294410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "folio"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD "folio" integer NOT NULL`);
    }

}
