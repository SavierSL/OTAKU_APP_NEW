import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Resolver,
} from "type-graphql";
import { AnimePost } from "../Entities/AnimePost";

@InputType()
class AnimePostInput {
  @Field()
  title!: string;

  //OWNER FIELD
  @Field()
  creatorId!: number;

  @Field()
  text!: string;

  @Field()
  synopsis!: string;

  @Field()
  rated!: string;

  @Field(() => Int)
  score!: number;

  @Field()
  imageUrl!: string;
}
//GraphQL
@Resolver()
export class AnimePostResolver {
  @Mutation(() => AnimePost)
  async createAnimePost(
    @Arg("input") input: AnimePostInput,
    @Ctx() { req }: MyContext
  ): Promise<AnimePost | String> {
    return AnimePost.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }
}
