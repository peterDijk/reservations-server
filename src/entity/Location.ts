import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { IsString, MinLength } from 'class-validator';
import Account from './Account';

@Entity()
class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(2)
  @Column('text')
  name: string;

  @Column('text')
  capacity: number;

  @ManyToOne((type) => Account, (account) => account.locations)
  account: Account;
}

export default Location;
