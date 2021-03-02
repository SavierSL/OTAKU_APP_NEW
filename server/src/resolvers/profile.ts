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
import { text } from "express";
import { AnimePost } from "../Entities/AnimePost";
import { getConnection } from "typeorm";
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

  @Mutation(() => Profile, { nullable: true })
  async createProfile(
    @Arg("bio") bio: string,
    @Arg("age") age: string,
    @Arg("country") country: string,
    @Arg("mostFavouriteCharacter") mostFavouriteCharacter: string,
    @Ctx() { req }: MyContext
  ): Promise<Profile | undefined> {
    const findProf = await Profile.findOne({ userId: req.session.userId });
    if (findProf) {
      return;
    }
    const createProf = await Profile.create({
      userId: req.session.userId,
      bio,
      age,
      country,
      mostFavouriteCharacter,
    }).save();
    return createProf;
  }
  @Mutation(() => Profile, { nullable: true })
  async updateProfile(
    @Arg("id", () => Int) id: number,
    @Arg("bio") bio: string,
    @Arg("age") age: string,
    @Arg("country") country: string,
    @Arg("mostFavouriteCharacter") mostFavouriteCharacter: string
  ): Promise<Profile> {
    const updateProfile = await getConnection()
      .createQueryBuilder()
      .update(Profile)
      .set({ bio, age, country, mostFavouriteCharacter })
      .where("id = :id", {
        id: id,
      })
      .returning("*")
      .execute();
    return updateProfile.raw[0];
  }

  @Query(() => Profile, { nullable: true })
  async getProfile(@Ctx() { req }: MyContext) {
    const userProfile = await Profile.findOne({ userId: req.session.userId });
    return userProfile;
  }
  @Query(() => [AnimePost])
  async getProfilePost(@Ctx() { req }: MyContext): Promise<AnimePost[]> {
    const userPosts = await AnimePost.find({ creatorId: req.session.userId });
    return userPosts;
  }
}
