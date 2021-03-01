import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Anime } from "./FavAnime";

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
  bio!: string;

  @Field()
  @Column()
  age!: string;

  @Field()
  @Column()
  country!: string;

  @Field()
  @Column()
  mostFavouriteCharacter!: string;
  //ha
  @Field()
  @PrimaryColumn()
  userId!: number; //foreign key

  @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
  user: User;

  @OneToMany(() => Anime, (anime) => anime.fan)
  favAnimes: Anime[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
