import { Module } from '@nestjs/common';
import { CabinetTypeService } from './cabinet-type.service';
import { CabinetTypeController } from './cabinet-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CabinetTypeEntity } from './entities/cabinet-type.entity';
import { ProductionModule } from '../production/production.module';
import { ProductionRecordEntity } from '../production-record/entities/production-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CabinetTypeEntity, ProductionRecordEntity]),
    ProductionModule
  ],
  controllers: [CabinetTypeController],
  providers: [CabinetTypeService],
})
export class CabinetTypeModule {}
