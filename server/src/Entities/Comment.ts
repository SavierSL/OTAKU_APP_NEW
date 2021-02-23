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
import { AnimePost } from "./AnimePost";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  comment!: string;

  @Field(() => Int)
  @Column()
  commentorId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  commentor!: User;

  @Field()
  @Column()
  animePostId: number;

  @ManyToOne(() => AnimePost, (animepost) => animepost.comments)
  animePost: AnimePost;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
