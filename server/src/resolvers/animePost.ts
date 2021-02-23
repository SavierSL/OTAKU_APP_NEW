import { User } from "src/Entities/User";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  UseMiddleware,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { AnimePost } from "../Entities/AnimePost";
import { isAuth } from "../middleware/isAuth";

@InputType()
class AnimePostInput {
  @Field()
  title!: string;

  // //OWNER FIELD
  // @Field(() => Int)
  // creatorId!: number;

  @Field()
  text!: string;

  @Field()
  synopsis!: string;

  @Field()
  rated!: string;

  @Field()
  score!: string;

  @Field()
  image_url!: string;
}
@ObjectType()
export class PaginatedAnimePosts {
  @Field()
  hasMore?: boolean;

  @Field(() => [AnimePost])
  animes?: AnimePost[];
}
//GraphQL
@Resolver()
export class AnimePostResolver {
  @Query(() => AnimePost)
  async animePost(
    @Arg("id", () => Int) id: number
  ): Promise<AnimePost | undefined> {
    const findAnimePost = await AnimePost.findOne(id, {
      relations: ["creator"],
    });
    return findAnimePost;
  }
  @Query(() => PaginatedAnimePosts)
  async animePosts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedAnimePosts> {
    const realLimit = Math.min(2, limit);
    const realLimitPlusOne = realLimit + 1;
    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await getConnection().query(
      `
    select p.*,
        json_build_object(
      'id', u.id,
      'username', u.username,
     ${req.session.userId ? ` 'email', u.email,` : ""}
      'createdAt', u."createdAt"
      ) creator

    from anime_post p
 
    inner join public.user u on u.id = p."creatorId"

    ${cursor ? `where p."createdAt" < $2` : ""} 

    order by p."createdAt" DESC

    limit $1
    `,
      replacements
    );
    return {
      hasMore: posts.length === realLimitPlusOne,
      animes: posts.slice(0, realLimit),
    };
  }

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
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    try {
      const postDeleted = await AnimePost.delete({
        creatorId: req.session.userId,
        id: id,
      });
      if (postDeleted) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  @Mutation(() => AnimePost)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id", () => Int) id: string,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext
  ): Promise<AnimePost> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(AnimePost)
      .set({ title, text })
      .where('id = :id and "creatorId" = :creatorId', {
        id: id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }
}
