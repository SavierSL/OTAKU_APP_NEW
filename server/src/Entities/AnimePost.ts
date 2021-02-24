import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

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

  @Field(() => User)
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

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.animePost)
  comments: Comment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
