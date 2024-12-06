import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Googlesheets } from './googlesheets.entity';
import { User } from 'src/auth/user.entity'; // Import User entity to reference

@Injectable()
export class GoogleSheetsService {
  constructor(
    @InjectRepository(Googlesheets)
    private readonly googlesheetRepository: Repository<Googlesheets>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject the User repository to get user data
  ) {}

  // Function to create API for a Google Sheets URL
  async createApiForSpreadsheet(
    accessToken: string,
    googleSheetUrl: string,
    userId: number,
  ): Promise<string> {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const sheets = google.sheets({ version: 'v4', auth });

    // Extract Google Sheet ID from the URL
    const googleSheetId = this.extractSheetIdFromUrl(googleSheetUrl);

    // Get Google Sheet title
    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: googleSheetId,
    });
    const title = sheetInfo.data.properties?.title || 'Untitled';

    // Generate unique API endpoint
    const uniqueId = uuidv4();
    const endpoint = `https://api.sheetrocket.com/${uniqueId}`;

    //Fetch the user from the database
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    // Save to the database (linking user)
    const userSpreadsheet = this.googlesheetRepository.create({
      user,
      googleSheetId,
      title,
      uniqueId,
      endpoint,
    });
    await this.googlesheetRepository.save(userSpreadsheet);

    return endpoint; // Return the generated API endpoint
  }

  // Helper function to extract Google Sheet ID from URL
  private extractSheetIdFromUrl(url: string): string {
    const matches = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!matches) {
      throw new Error('Invalid Google Sheets URL');
    }
    return matches[1];
  }
}
