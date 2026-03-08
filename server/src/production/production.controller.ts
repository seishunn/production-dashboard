import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductionService } from './production.service';
import { ExcelParserService } from './services/excel-parser.service';
import { ExcelParserDto } from './dto/import-excel.dto';
import { CreateProductionDto } from './dto/create-production.dto';

@Controller('production')
export class ProductionController {
  constructor(
    private readonly productionService: ProductionService,
    private readonly excelParserService: ExcelParserService
  ) {}

  @Get()
  async findAll() {
    return this.productionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productionService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateProductionDto) {
    return this.productionService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productionService.delete(id);
  }

  @Post('excel')
  async importExcel(@Body() dto: ExcelParserDto) {
    return this.excelParserService.parseExcelFile(dto);
  }
}
