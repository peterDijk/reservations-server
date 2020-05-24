import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import logger from '../__init__/logger';
import Account from './Account';

@Entity()
class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(2)
  @Column('text')
  Locationname: string;

  @Column('text')
  capacity: number;

  @ManyToOne((_) => Account, (account) => account.locations)
  account: Account;

  //   @OneToMany(_ => Ticket, ticket => ticket.Location)
  //   tickets: Ticket[]
}

export default Location;
