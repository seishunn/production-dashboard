import { Module } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ProductionController } from './production.controller';
import { ExcelParserService } from './services/excel-parser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionEntity } from './entities/production.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionEntity])],
  controllers: [ProductionController],
  providers: [ProductionService, ExcelParserService],
  exports: [ProductionService]
})
export class ProductionModule {}
