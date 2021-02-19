import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class AnimePost extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  //OWNER FIELD
  @Field(() => Int)
  @Column()
  creatorId!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.animePost)
  creator: User;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  rated!: string;

  @Field()
  @Column()
  synopsis!: string;

  @Field()
  @Column()
  score!: string;

  @Field()
  @Column()
  image_url!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
