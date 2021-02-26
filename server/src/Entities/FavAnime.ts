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
import { Profile } from "./Profile";
import { User } from "./User";

@ObjectType()
@Entity()
export class Anime extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  fanId: number;

  @ManyToOne(() => Profile, (profile) => profile.favAnimes)
  fan: Profile;

  @Field()
  @Column()
  rated!: string;

  @Field()
  @Column()
  synopsis!: string;

  @Field()
  @Column()
  score!: number;

  @Field()
  @Column()
  image_url!: string;
}
