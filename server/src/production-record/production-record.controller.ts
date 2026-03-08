import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductionRecordService } from './production-record.service';
import { CreateProductionRecordDto } from './dto/create-production-record.dto';

@Controller('production-record')
export class ProductionRecordController {
  constructor(private readonly productionRecordService: ProductionRecordService) {}

  @Get()
  async findAll() {
    return this.productionRecordService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productionRecordService.findById(id);
  }

  @Get('date/:id')
  async findByDate(
    @Param('id') id: string,
    @Query('productionId') productionId: string,
    @Query('date') date: string,
  ) {
    return this.productionRecordService.findByDate(productionId, id, date);
  }

  @Post()
  async create(@Body() dto: CreateProductionRecordDto) {
    return this.productionRecordService.create(dto);
  }

  @Patch(':id')
  async patchUpdate(@Param('id') id: string, @Body() dto: Partial<CreateProductionRecordDto>) {
    return this.productionRecordService.patchUpdate(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productionRecordService.delete(id);
  }
}
