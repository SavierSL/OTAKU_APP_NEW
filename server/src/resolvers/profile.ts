import { Profile } from "../Entities/Profile";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
// import { getConnection } from "typeorm";

@InputType()
class ProfileInput {
  @Field(() => String)
  favouriteAnimes: string;

  @Field(() => String)
  mostFavouriteCharacter: string;
}

@Resolver()
export class PorfileResolver {
  @Mutation(() => Profile)
  async createProfile(
    @Arg("input") input: ProfileInput,
    @Ctx() { req }: MyContext
  ): Promise<Profile | Boolean> {
    const isProfile = await Profile.findOne({ userId: req.session.userId });
    if (isProfile) {
      throw new Error("Already created a profile");
    }
    try {
      return Profile.create({
        ...input,
        userId: req.session.userId,
      }).save();
    } catch (error) {
      return false;
    }
  }
}
