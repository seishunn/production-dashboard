import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductionRecordEntity } from "../../production-record/entities/production-record.entity";
import { CabinetTypeEntity } from "../../cabinet-type/entities/cabinet-type.entity";

@Entity({ name: 'productions' })
export class ProductionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 256
  })
  name: string;

  @OneToMany(() => ProductionRecordEntity, (productionRecord) => productionRecord.cabinetType)
  records: ProductionRecordEntity[];

  @ManyToMany(() => CabinetTypeEntity, (cabinetRecord) => cabinetRecord.productions)
  @JoinTable({
    name: 'production_cabinets',
    joinColumn: {
      name: 'production_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'cabinet_id',
      referencedColumnName: 'id'
    }
  })
  cabinets: CabinetTypeEntity[];

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}