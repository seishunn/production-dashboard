import { Injectable } from "@nestjs/common";
import * as ExcelJS from "exceljs";
import * as path from "path";
import { ExcelParserDto } from "../dto/import-excel.dto";
import { SectionType } from "../enums/section-type.enum";

@Injectable()
export class ExcelParserService {
  private readonly allowedMonths = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];

  async parseExcelFile(dto: ExcelParserDto) {
    const { filePath } = dto;

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      workbook.worksheets.forEach((worksheet) => {
        const sheetName = worksheet.name.trim().toLowerCase();

        if (this.isValidMonth(sheetName)) {
          // console.log(`Обработка листа: ${sheetName}`);
          this.parseWorksheet(worksheet, sheetName);
        } else {
          // console.log(`Пропускаем лист: ${sheetName}`);
        }
      })
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private parseWorksheet(worksheet: ExcelJS.Worksheet, monthName: string) {
    let currentSection: SectionType | null = null;

    worksheet.eachRow((row, rowNumber) => {
      const rowTitle = row.getCell(1).text.trim().toLowerCase();
      const newSection = this.detectSection(rowTitle);

      switch (newSection) {
        case SectionType.FACT:
        case SectionType.PLAN:
          this.parsePlanFactSection(worksheet, newSection, rowNumber);
          break;
        default:
          // console.log(`Отсутствует обработчик для: ${newSection}`);
          break;
      }

      if (newSection) {
        currentSection = newSection;
      }
    })
  }

  private detectSection(firstCell: string): SectionType | null {
    if (!firstCell) return null;

    const lowerCase = firstCell.trim().toLowerCase();
    const sectionValues = Object.values(SectionType);
    const foundSection = sectionValues.find((value) => 
      lowerCase.includes(value) || value.includes(lowerCase)
    );

    return foundSection as SectionType || null;
  }

  private parsePlanFactSection(worksheet: ExcelJS.Worksheet, sectionType: SectionType, rowNumber: number) {
    const headerRow = worksheet.getRow(rowNumber + 1);
    const headers = this.parsePlanFactHeader(headerRow);
  }

  private parsePlanFactHeader(row: ExcelJS.Row) {
    const headers: HeaderColumn[] = [];

    row.eachCell((cell, colNumber) => {
      if (colNumber === 1) return;

      const cellValue = cell.value;

      if (typeof cellValue === 'object') {
        headers.push({
          column: colNumber,
          date: new Date(cellValue!.toString())
        })
      }
    });

    console.log(headers);
    
  }

  private isValidMonth(sheetName: string): boolean {
    return this.allowedMonths.includes(sheetName);
  }
}

interface HeaderColumn {
  column: number;
  date: Date;
}