import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleSheetsService } from './googlesheets.service';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('googlesheets')
export class GoogleSheetsController {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard
  @Post('create-api')
  async createApiEndpoint(
    @Body() createSheetDto: CreateSheetDto, // Validates and retrieves Google Sheets URL
    @Req() req,
    @Res() res,
  ) {
    const { googleSheetUrl } = createSheetDto; // Extracting the URL from the DTO
    const accessToken = req.user.accessToken; // User’s Google access token
    const userId = req.user.id; // Authenticated user's ID

    try {
      // Create the API endpoint for the spreadsheet
      const endpoint = await this.googleSheetsService.createApiForSpreadsheet(
        accessToken,
        googleSheetUrl,
        userId,
      );
      res.json({ endpoint }); // Respond with the API endpoint URL
    } catch (error) {
      console.error('Error creating API endpoint for Google Sheet:', error);
      res.status(500).json({ error: 'Failed to create API endpoint' });
    }
  }
}
