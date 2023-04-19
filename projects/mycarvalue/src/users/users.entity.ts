import { Exclude } from 'class-transformer';
import { Report } from '../reports/reports.entity';
import {
  AfterInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted id in table ', this.id);
  }

  @Column({ default: true })
  admin: boolean;
}
