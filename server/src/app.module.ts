import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductionModule } from './production/production.module';
import { CabinetTypeModule } from './cabinet-type/cabinet-type.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { ProductionRecordModule } from './production-record/production-record.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService]
    }),
    ProductionModule, CabinetTypeModule, ProductionRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
