import { Module } from '@nestjs/common';
import { ProductionRecordService } from './production-record.service';
import { ProductionRecordController } from './production-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionRecordEntity } from './entities/production-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionRecordEntity])],
  controllers: [ProductionRecordController],
  providers: [ProductionRecordService],
})
export class ProductionRecordModule {}
