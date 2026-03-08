import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductionRecordEntity } from "../../production-record/entities/production-record.entity";
import { ProductionEntity } from "../../production/entities/production.entity";

@Entity({ name: 'cabinet_types' })
export class CabinetTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @OneToMany(() => ProductionRecordEntity, (productionRecord) => productionRecord.cabinetType)
  records: ProductionRecordEntity[];

  @ManyToMany(() => ProductionEntity, (productionRecord) => productionRecord.cabinets)
  productions: ProductionEntity[];

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}