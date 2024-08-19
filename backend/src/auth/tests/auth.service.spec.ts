import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw conflict exception if user already exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(new User());
      await expect(
        service.register({
          email: 'test@example.com',
          name: 'Test',
          password: 'password',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create a new user and return it', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(userRepository, 'create').mockReturnValueOnce(new User());
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(new User());
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword');

      const result = await service.register({
        email: 'test@example.com',
        name: 'Test',
        password: 'password',
      });

      expect(result).toBeInstanceOf(User);
    });
  });

  describe('login', () => {
    it('should throw unauthorized exception if credentials are invalid', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(
        service.login({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return access token if credentials are valid', async () => {
      const user = new User();
      user.password = await bcrypt.hash('password', 10);

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');

      const result = await service.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toEqual({ accessToken: 'accessToken' });
    });
  });
});
