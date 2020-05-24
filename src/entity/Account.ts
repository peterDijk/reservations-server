import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import logger from '../__init__/logger';
import Location from './Location';
import User from './User';

@Entity()
class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(2)
  @Column('text')
  Accountname: string;

  @Column('text', { nullable: true })
  accountDescription: string;

  @Column('text')
  administrator: User;

  @OneToMany((_) => Location, (locations) => locations.account)
  locations: Location[];
}

export default Account;
