import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  ManyToMany,
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
  name: string;

  @Column('text', { nullable: true })
  accountDescription: string;

  @ManyToOne((type) => User, (user) => user.accounts)
  administrator: User;

  @ManyToMany((type) => User, (user) => user.accounts)
  members: User[];

  @OneToMany((type) => Location, (location) => location.account)
  locations: Location[];
}

export default Account;
