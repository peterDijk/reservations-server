import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Location from './Location';
import Reservation from './Reservation';

@Entity()
export default class TimeUnit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  capacity: number;

  @ManyToOne((type) => Location, (location) => location.timeUnits)
  location: Location;

  @OneToMany((type) => Reservation, (reservation) => reservation.timeUnit)
  reservations: Reservation[];
}
