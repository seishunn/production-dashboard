import { IsString, MaxLength } from "class-validator";

export class CreateProductionDto {
  @IsString()
  @MaxLength(255)
  name: string;
}