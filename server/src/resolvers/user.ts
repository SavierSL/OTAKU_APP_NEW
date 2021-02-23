import { User } from "../Entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { validateRegister } from "../utils/validateRegister";
import argon2 from "argon2";
import { MyContext } from "src/types";

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class ResponseField {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      return null;
    }
    return user; //
  }

  @Mutation(() => ResponseField)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<ResponseField> {
    const response = validateRegister(options);
    if (response) {
      return response;
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({ ...options, password: hashedPassword })
        .returning("*")
        .execute(); //it is returning *;
      user = result.raw[0]; //datas
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username or email",
              message: "one of them is already taken",
            },
          ],
        };
      }
    }
    //for cookie
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => ResponseField)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<ResponseField> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "Cannot find post",
            message: "No user",
          },
        ],
      };
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return {
        errors: [
          {
            field: "password",
            message: "wrong password",
          },
        ],
      };
    }
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    //if there is an error in req.session.destroy() it will return false
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie("cid");
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
