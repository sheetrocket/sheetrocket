import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Googlesheets } from './googlesheets/googlesheets.entity';
import { GoogleSheetsModule } from './googlesheets/googlesheets.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'my_db_name',
      password: 'my_db_password',
      database: 'postgres',
      entities: [User, Googlesheets],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    GoogleSheetsModule,
  ],
})
export class AppModule {}
