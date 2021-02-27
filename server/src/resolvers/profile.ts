import { Profile } from "../Entities/Profile";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Anime } from "../Entities/FavAnime";
// import { getConnection } from "typeorm";
@InputType()
class favAnimeInput {
  @Field()
  title!: string;

  @Field()
  rated!: string;

  @Field()
  synopsis!: string;

  @Field(() => Int)
  score!: number;

  @Field()
  image_url!: string;
}
@ObjectType()
class PaginatedFavAnimes {
  @Field(() => [Anime])
  favAnimeList?: Anime[];
}

@Resolver()
export class PorfileResolver {
  @Mutation(() => Anime)
  async addFavAnime(
    @Arg("input") input: favAnimeInput,
    @Ctx()
    { req }: MyContext
  ) {
    const createFavAnime = Anime.create({
      fanId: req.session.userId,
      ...input,
    }).save();
    return createFavAnime;
  }

  @Mutation(() => Boolean)
  async removeFavAnime(
    @Arg("id", () => Int) id: number,
    @Ctx()
    { req }: MyContext
  ): Promise<Boolean> {
    const deleteFavAnime = Anime.delete({
      fanId: req.session.userId,
      id,
    });
    if (deleteFavAnime) {
      return true;
    }
    return false;
  }
  @Query(() => PaginatedFavAnimes)
  async getFavAnimes(@Ctx() { req }: MyContext): Promise<PaginatedFavAnimes> {
    const favAnimes = await Anime.find({
      where: { fanId: req.session.userId },
    });
    return {
      favAnimeList: favAnimes,
    };
  }

  // @Mutation(() => Profile)
  // async createProfile(
  //   @Arg("bio") bio: string,
  //   @Arg("age") age: number,
  //   @Arg("country") country: string,
  //   @Arg("mostFavouriteCharacter") mostFavouriteCharacter: string
  // ) {}
}
