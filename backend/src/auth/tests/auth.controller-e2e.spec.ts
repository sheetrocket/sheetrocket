import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../auth.module'; // Adjust path as necessary
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:', // SQLite in-memory database
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user', async () => {
      const userDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(userDto)
        .expect(201);

      const { email } = response.body;
      expect(email).toBe(userDto.email);

      const user = await userRepository.findOneBy({ email });
      expect(user).toBeDefined();
      expect(await bcrypt.compare(userDto.password, user.password)).toBe(true);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should log in an existing user', async () => {
      const userDto = {
        name: 'Test User',
        email: 'test2@example.com',
        password: 'password123',
      };

      await userRepository.save({
        ...userDto,
        password: await bcrypt.hash(userDto.password, 10),
      });

      const loginDto = { email: 'test@example.com', password: 'password123' };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200);

      const { accessToken } = response.body;
      expect(accessToken).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);
    });
  });
});
