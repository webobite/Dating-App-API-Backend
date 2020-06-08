import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
} from "typeorm";


// Entity --> my User
@Entity()
export class MyUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @PrimaryColumn()
  // uid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  salt: string;

  @Column({default: null})
  imagePath: string;

  @Column()
  noOfLikes: number;

  @Column("int", {array : true, default : null})
  blockedByUserId: number[];

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;
}
