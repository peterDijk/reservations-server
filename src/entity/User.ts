import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(2)
  @Column('text')
  memberNumber: string;

  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string;

  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string;

  @IsEmail()
  @Column('text')
  email: string;

  @IsString()
  @MinLength(5)
  @Column('text')
  @Exclude({ toPlainOnly: true }) // what does this do ? transformation?
  password: string;

  @Column('boolean', { nullable: false, default: false })
  isAdmin: boolean;

  @Column('boolean', { nullable: false, default: false })
  isSuperAdmin: boolean;

  //   @OneToMany(_ => Ticket, ticket => ticket.user)
  //   tickets: Ticket[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10);
    this.password = hash;
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}

export default User;
