import { IsNotEmpty, IsString } from "class-validator";

export class ExcelParserDto {
  @IsString()
  @IsNotEmpty()
  filePath: string;
}