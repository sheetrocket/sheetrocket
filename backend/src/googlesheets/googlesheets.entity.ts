import { User } from 'src/auth/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Googlesheets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  googleSheetId: string; // Extracted from the user-provided URL

  @Column()
  title: string; // Title of the Google Sheet

  @Column({ unique: true })
  uniqueId: string; // Randomly generated unique ID for API endpoint

  @Column()
  endpoint: string; // Generated API endpoint URL

  @Column('simple-array', { default: 'GET,POST,PUT,DELETE' })
  allowedMethods: string[]; // Allowed HTTP methods for the API

  @CreateDateColumn()
  createdAt: Date;

  // Many spreadsheets belong to one user
  @ManyToOne(() => User, (user) => user.googlesheets, { onDelete: 'CASCADE' })
  user: User;
}
