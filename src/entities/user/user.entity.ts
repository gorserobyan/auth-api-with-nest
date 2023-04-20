import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { E_Gender } from './types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'username', type: 'varchar' })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'firstName', type: 'varchar' })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar' })
  lastName: string;

  @Column({ name: 'dob', type: 'timestamp', nullable: true })
  dob: Date;

  @Column({ name: 'gender', type: 'enum', enum: E_Gender, nullable: true })
  gender: E_Gender | null;

  @Column({ name: 'createdAt', type: 'timestamp', nullable: true, default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ name: 'updatedAt', type: 'timestamp', nullable: true, default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
