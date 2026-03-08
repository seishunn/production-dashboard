import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CabinetTypeEntity } from "../../cabinet-type/entities/cabinet-type.entity";
import { ProductionEntity } from "../../production/entities/production.entity";

@Entity({ name: 'production_records' })
export class ProductionRecordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  @Index()
  date: Date;

  @Column({
    type: 'int',
    default: 0,
    unsigned: true
  })
  plan: number;

  @Column({
    type: 'int',
    default: 0,
    unsigned: true
  })
  fact: number;

  // Production
  @Column({
    name: 'production_id',
    type: 'uuid'
  })
  productionId: string;
  
  @ManyToOne(() => ProductionEntity, (production) => production, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'production_id' })
  production: ProductionEntity;

  // CabinetType
  @Column({
    name: 'cabinet_type_id',
    type: 'uuid'
  })
  cabinetTypeId: string;
  
  @ManyToOne(() => CabinetTypeEntity, (cabinetType) => cabinetType, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'cabinet_type_id' })
  cabinetType: CabinetTypeEntity;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}