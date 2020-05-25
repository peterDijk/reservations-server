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
import { Role } from '../types';
import Account from './Account';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(2)
  @Column('text')
  username: string;

  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName: string;

  @IsEmail()
  @Column('text', { nullable: false })
  email: string;

  @IsString()
  @MinLength(5)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column('text', { nullable: false, default: Role.USER })
  roles: Role[];

  @OneToMany((type) => Account, (account) => account.administrator)
  accounts: Account[];

  async setPassword(rawPassword: string) {
    try {
      const hash = await bcrypt.hash(rawPassword, 12);
      this.password = hash;
    } catch (e) {
      logger.error(e);
    }
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}

export default User;
