import { IsUUID, IsNotEmpty } from 'class-validator';

export class LinkCabinetToProductionDto {
  @IsUUID()
  @IsNotEmpty()
  cabinetId: string;

  @IsUUID()
  @IsNotEmpty()
  productionId: string;
}