import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CabinetTypeEntity } from './entities/cabinet-type.entity';
import { Between, ILike, LessThanOrEqual, Repository } from 'typeorm';
import { CreateCabinetTypeDto } from './dto/create-cabinet-type.dto';
import { ProductionService } from '../production/production.service';
import { LinkCabinetToProductionDto } from '../dto/link-cabinet.dto';
import { ProductionRecordEntity } from '../production-record/entities/production-record.entity';

@Injectable()
export class CabinetTypeService {
  constructor (
    @InjectRepository(CabinetTypeEntity)
    private readonly cabinetRepository: Repository<CabinetTypeEntity>,
    private readonly productionService: ProductionService,
    @InjectRepository(ProductionRecordEntity) // Добавляем репозиторий записей
    private readonly recordRepository: Repository<ProductionRecordEntity>,
  ) {}

  async findAll(): Promise<CabinetTypeEntity[]> {
    return await this.cabinetRepository.find();
  }

  async findAllWithRecords(
    productionId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<CabinetTypeEntity[]> {
    const whereCondition: any = {
      records: {
        productionId,
      }
    };

    if (startDate || endDate) {
      whereCondition.records.date = {};
      
      if (startDate && endDate) {
        whereCondition.records.date = Between(startDate, endDate);
      } 
      else if (startDate && !endDate) {
        whereCondition.records.date = Between(startDate, new Date());
      } 
      else if (!startDate && endDate) {
        whereCondition.records.date = LessThanOrEqual(endDate);
      }
    }

    return await this.cabinetRepository.find({
      relations: {
        records: true,
      },
      where: whereCondition,
      order: {
        name: 'ASC',
        records: {
          date: 'ASC'
        }
      },
      
    })
  }

  async getProductionCabinetsWithRecords(
    productionId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<CabinetTypeEntity[]> {
    let recordCondition = 'record.productionId = :productionId';
    const parameters: any = { productionId };

    if (startDate) {
      recordCondition += ' AND record.date >= :startDate';
      parameters.startDate = startDate;
    }
    
    if (endDate) {
      recordCondition += ' AND record.date <= :endDate';
      parameters.endDate = endDate;
    }

    return await this.cabinetRepository
      .createQueryBuilder('cabinet')
      .innerJoin(
        'cabinet.productions',
        'production',
        'production.id = :productionId',
        { productionId }
      )
      .leftJoinAndSelect(
        'cabinet.records',
        'record',
        recordCondition,
        parameters
      )
      .orderBy('cabinet.name', 'ASC')
      .addOrderBy('record.date', 'ASC')
      .getMany();
  }

  async findById(id: string): Promise<CabinetTypeEntity> {
    const production = await this.cabinetRepository.findOne({
      where: {
        id,
      },
    })

    if (!production) {
      throw new NotFoundException('Шкаф не найден');
    }

    return production;
  }

  async findByName(name: string): Promise<CabinetTypeEntity | null> {
    if (!name || name.trim() === '') {
      throw new BadRequestException('Имя шкафа не может быть пустым');
    }

    const cabinet = await this.cabinetRepository.findOne({
      where: {
        name: name.trim(),
      },
    });

    return cabinet || null;
  }

  async searchAvailableCabinets(searchString: string): Promise<CabinetTypeEntity[]> {
    if (!searchString || searchString.trim() === '') {
      return [];
    }

    return await this.cabinetRepository.find({
      where: {
        name: ILike(`%${searchString.trim()}%`),
      },
      order: {
        name: 'ASC'
      }
    });
  }

  async linkToProduction(dto: LinkCabinetToProductionDto): Promise<CabinetTypeEntity> {
    const { cabinetId, productionId } = dto;

    // Находим шкаф с его связями
    const cabinet = await this.cabinetRepository.findOne({
      where: { id: cabinetId },
      relations: ['productions']
    });

    if (!cabinet) {
      throw new NotFoundException('Шкаф не найден');
    }

    // Находим производство
    const production = await this.productionService.findById(productionId);

    // Проверяем, не связан ли уже шкаф с этим производством
    const isAlreadyLinked = cabinet.productions?.some(p => p.id === productionId);
    
    if (isAlreadyLinked) {
      throw new BadRequestException('Шкаф уже связан с этим производством');
    }

    // Добавляем связь
    if (!cabinet.productions) {
      cabinet.productions = [];
    }
    
    cabinet.productions.push(production);
    
    // Сохраняем изменения
    return await this.cabinetRepository.save(cabinet);
  }

  async unlinkFromProduction(dto: LinkCabinetToProductionDto): Promise<CabinetTypeEntity> {
    const { cabinetId, productionId } = dto;

    const cabinet = await this.cabinetRepository.findOne({
      where: { id: cabinetId },
      relations: ['productions']
    });

    if (!cabinet) {
      throw new NotFoundException('Шкаф не найден');
    }

    await this.recordRepository.delete({
      cabinetTypeId: cabinetId,
      productionId: productionId
    });

    // Удаляем связь
    cabinet.productions = cabinet.productions?.filter(p => p.id !== productionId) || [];
    
    return await this.cabinetRepository.save(cabinet);
  }

  async create(dto: CreateCabinetTypeDto): Promise<CabinetTypeEntity> {
    const foundProduction = await this.findByName(dto.name);

    if (foundProduction) {
      throw new ConflictException(`Шкаф с названием "${dto.name}" уже существует`)
    }

    const production = this.cabinetRepository.create(dto);

    return await this.cabinetRepository.save(production);
  }

  async delete(id: string): Promise<CabinetTypeEntity> {
    const production = await this.findById(id);

    await this.cabinetRepository.remove(production);

    return production;
  }
}
