import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  //Field() is from type graphql
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  favouriteAnimes!: string;

  @Field()
  @Column()
  mostFavouriteCharacter!: string;
  //ha
  @Field()
  @PrimaryColumn()
  userId!: number; //foreign key

  @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
