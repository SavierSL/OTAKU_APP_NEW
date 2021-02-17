import { User } from "../Entities/User";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(@Arg("options") options: UserInput): Promise<User | null> {
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({ ...options })
        .returning("*")
        .execute(); //it is returning *;
      user = result.raw[0]; //datas
      return user;
    } catch (error) {
      return null;
    }
  }
}
