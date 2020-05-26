import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import User from './User';
import TimeUnit from './TimeUnit';

@Entity()
export default class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  date: Date;

  @ManyToOne((type) => User, (user) => user.reservations)
  user: User;

  @ManyToOne((type) => TimeUnit, (timeUnit) => timeUnit.reservations)
  timeUnit: TimeUnit;
}
