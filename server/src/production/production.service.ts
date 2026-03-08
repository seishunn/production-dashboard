import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductionEntity } from './entities/production.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductionDto } from './dto/create-production.dto';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(ProductionEntity)
    private readonly productionRepository: Repository<ProductionEntity>
  ) {}

  async findAll(): Promise<ProductionEntity[]> {
    return await this.productionRepository.find();
  }

  async findById(id: string): Promise<ProductionEntity> {
    const production = await this.productionRepository.findOne({
      where: {
        id,
      },
    })

    if (!production) {
      throw new NotFoundException('Производство не найдено');
    }

    return production;
  }

  async create(dto: CreateProductionDto): Promise<ProductionEntity> {
    const production = this.productionRepository.create(dto);

    return await this.productionRepository.save(production);
  }

  async delete(id: string): Promise<ProductionEntity> {
    const production = await this.findById(id);

    await this.productionRepository.remove(production);

    return production;
  }
}
