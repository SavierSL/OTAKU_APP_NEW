import { Field, Int, ObjectType } from "type-graphql";
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
  @Field()
  @Column()
  creatorId!: number;

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

  @Field(() => Int)
  @Column()
  score!: number;

  @Field()
  @Column()
  imageUrl!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
