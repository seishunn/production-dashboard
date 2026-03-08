import { IsString, MaxLength } from "class-validator";

export class CreateCabinetTypeDto {
  @IsString()
  @MaxLength(255)
  name: string;
}