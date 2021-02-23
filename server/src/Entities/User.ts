import { ObjectType, Field, Int } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AnimePost } from "./AnimePost";
import { Profile } from "./Profile";
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  //Field() is from type graphql
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field({ nullable: true })
  @Column({ unique: true })
  email!: string;

  @Column({ default: "confidential" })
  password!: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Comment, (comment) => comment.commentor)
  comments: Comment[];

  //POSTS
  @OneToMany(() => AnimePost, (animePost) => animePost.creator)
  animePost: AnimePost[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
