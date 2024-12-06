import { IsString } from 'class-validator';

export class CreateSheetDto {
  @IsString()
  googleSheetUrl: string; // Google Sheets URL provided by the user
}
