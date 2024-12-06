import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleSheetsController } from './googlesheets.controller';
import { GoogleSheetsService } from './googlesheets.service';
import { Googlesheets } from './googlesheets.entity';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Googlesheets, User])],
  controllers: [GoogleSheetsController],
  providers: [GoogleSheetsService],
})
export class GoogleSheetsModule {}
