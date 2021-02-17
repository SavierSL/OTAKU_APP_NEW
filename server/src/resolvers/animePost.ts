import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { AnimePost } from "../Entities/AnimePost";

@InputType()
class AnimePostInput {
  @Field()
  anime: string;

  @Field()
  text: string;

  @Field()
  genre: string;

  @Field()
  year: number;
}
//GraphQL
@Resolver()
export class AnimePostResolver {
  @Mutation(() => AnimePost)
  async createAnimePost(
    @Arg("input") input: AnimePostInput
  ): Promise<AnimePost | String> {
    return AnimePost.create({
      ...input,
    }).save();
  }
}
