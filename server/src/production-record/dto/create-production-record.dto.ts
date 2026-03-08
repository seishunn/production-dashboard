import { IsDateString, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateProductionRecordDto  {
  @IsString()
  productionId: string;

  @IsString()
  cabinetTypeId: string;

  @IsDateString()
  date: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  plan: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  fact: number;
}