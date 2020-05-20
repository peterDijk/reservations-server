import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
} from 'typeorm';

@Entity()
class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  message: string;

  @Column('timestamptz', { nullable: false, default: () => `now()` })
  dateCreated: Timestamp;
}

export default Service;
