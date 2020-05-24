import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { IsString, MinLength } from 'class-validator';
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

  @OneToMany((type) => Location, (location) => location.account)
  locations: Location[];
}

export default Account;
