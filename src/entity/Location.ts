import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsString, MinLength } from 'class-validator';
import Account from './Account';
import TimeUnit from './TimeUnit';

@Entity()
class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(2)
  @Column('text')
  name: string;

  @OneToMany((type) => TimeUnit, (timeUnit) => timeUnit.location)
  timeUnits: TimeUnit[];

  @Column('boolean', { nullable: false, default: true })
  advanceIncludingToday: boolean;

  @Column('int', { nullable: false, default: 0 })
  advanceDays: number;

  @ManyToOne((type) => Account, (account) => account.locations)
  account: Account;
}

export default Location;
