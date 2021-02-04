import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1612393618850 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'path',
          type: 'varchar',
        },
        { //um pra muitos (1 quadra pode ter várias imagens)
          name: 'quadra_id',
          type: 'integer',
        }
      ],
      foreignKeys: [
        {
          name: 'ImageQuadra',
          columnNames: ['quadra_id'],
          referencedTableName: 'quadras',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
