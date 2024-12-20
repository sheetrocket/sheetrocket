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

  // Clear the users table before each test
  beforeEach(async () => {
    await userRepository.clear();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user and return the user object and access token', async () => {
      const userDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(userDto)
        .expect(201);

      const { user, accessToken } = response.body;
      expect(user).toBeDefined();
      expect(user.email).toBe(userDto.email);
      expect(accessToken).toBeDefined();

      const savedUser = await userRepository.findOneBy({
        email: userDto.email,
      });
      expect(savedUser).toBeDefined();
      expect(await bcrypt.compare(userDto.password, savedUser.password)).toBe(
        true,
      );
    });
  });

  describe('/auth/login (POST)', () => {
    it('should log in an existing user', async () => {
      const userDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await userRepository.save({
        ...userDto,
        password: await bcrypt.hash(userDto.password, 10),
      });

      const loginDto = { email: userDto.email, password: userDto.password };

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

  describe('/auth/current-user (GET)', () => {
    let accessToken: string;

    beforeEach(async () => {
      const userDto = {
        name: 'Test User',
        email: 'user@gmail.com',
        password: 'password123',
      };

      await userRepository.save({
        ...userDto,
        password: await bcrypt.hash(userDto.password, 10),
      });

      const loginDto = { email: userDto.email, password: userDto.password };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200);

      accessToken = response.body.accessToken;
    });

    it('should return the current logged-in user', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/current-user')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const currentUser = response.body;
      expect(currentUser.user).toBeDefined();
      expect(currentUser.user.email).toBe('user@gmail.com');
      expect(currentUser.user.name).toBe('Test User');
    });

    it('should reject unauthorized access', async () => {
      await request(app.getHttpServer()).get('/auth/current-user').expect(401);
    });
  });
});
