import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {} from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetCurrentUserDto } from './dto/current-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // Get the currently logged-in user's information
  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUser(
    @Request() req: RequestWithUser,
  ): Promise<GetCurrentUserDto> {
    return this.authService.getUserById(req.user.userId);
  }
}
