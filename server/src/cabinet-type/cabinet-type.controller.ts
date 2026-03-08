import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CabinetTypeService } from './cabinet-type.service';
import { CreateCabinetTypeDto } from './dto/create-cabinet-type.dto';
import { LinkCabinetToProductionDto } from '../dto/link-cabinet.dto';

@Controller('cabinet-type')
export class CabinetTypeController {
  constructor(private readonly cabinetTypeService: CabinetTypeService) {}

  @Get()
  async findAll() {
    return this.cabinetTypeService.findAll();
  }
  
  @Get('search')
  async searchAvailableCabinets(
    @Query('name') name: string,
  ) {
    return this.cabinetTypeService.searchAvailableCabinets(name);
  }

  @Post('link-to-production')
  async linkToProduction(
    @Body() dto: LinkCabinetToProductionDto,
  ) {
    return this.cabinetTypeService.linkToProduction(dto);
  }

  @Post('unlink-from-production')
  async unlinkFromProduction(
    @Body() dto: LinkCabinetToProductionDto,
  ) {
    return this.cabinetTypeService.unlinkFromProduction(dto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.cabinetTypeService.findById(id);
  }

  @Get('production/:productionId')
  async getProductionCabinetsWithRecords(
    @Param('productionId') productionId: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.cabinetTypeService.getProductionCabinetsWithRecords(productionId, startDate, endDate);
  }

  @Post()
  async create(@Body() dto: CreateCabinetTypeDto) {
    return this.cabinetTypeService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cabinetTypeService.delete(id);
  }
}
