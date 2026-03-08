import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionRecordEntity } from './entities/production-record.entity';
import { Repository } from 'typeorm';
import { CreateProductionRecordDto } from './dto/create-production-record.dto';

@Injectable()
export class ProductionRecordService {
  constructor(
    @InjectRepository(ProductionRecordEntity)
    private readonly productionRecordRepository: Repository<ProductionRecordEntity>
  ) {}

  async findAll(): Promise<ProductionRecordEntity[]> {
    return await this.productionRecordRepository.find({
      relations: ['cabinetType']
    });
  }

  async findById(id: string): Promise<ProductionRecordEntity> {
    const production = await this.productionRecordRepository.findOne({
      where: {
        id,
      },
    })

    if (!production) {
      throw new NotFoundException('План производства не найден');
    }

    return production;
  }

  async findByDate(productionId: string, cabinetTypeId: string, date: string): Promise<ProductionRecordEntity>{
    const record = await this.productionRecordRepository.findOne({
      where: {
        productionId: productionId,
        cabinetTypeId: cabinetTypeId,
        date: new Date(date)
      }
    });

    if (!record) {
      throw new NotFoundException('Не найдена запись');
    }

    return record;
  }

  async create(dto: CreateProductionRecordDto): Promise<ProductionRecordEntity> {
    const production = this.productionRecordRepository.create(dto);

    return await this.productionRecordRepository.save(production);
  }

  async patchUpdate(id: string, dto: Partial<CreateProductionRecordDto>): Promise<ProductionRecordEntity> {
    const record = await this.findById(id);

    Object.assign(record, dto);

    await this.productionRecordRepository.save(record);

    return record;
  }

  async delete(id: string): Promise<ProductionRecordEntity> {
    const production = await this.findById(id);

    await this.productionRecordRepository.remove(production);

    return production;
  }
}
