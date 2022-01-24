import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int } from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../../entities/User";
import { MyContext } from "./MyContext";
import { createRefreshToken, createAccessToken } from "./auth";
import { isAuth } from "./isAuth";
import { sendRefreshToken } from "./sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  me(@Ctx() { payload }: MyContext) {
    try {
      return User.findOne(payload!.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection().getRepository(User).increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("bad password");
    }

    // login successful

    console.log("login successful");
    sendRefreshToken(res, createRefreshToken(user));
    console.log("tokens created");

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async register(@Arg("email") email: string, @Arg("username") username: string, @Arg("password") password: string) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        username,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  authRedirect(@Ctx() context: MyContext, { res }: MyContext) {
    const authorization = context.req.headers["authorization"];
    console.log(authorization);

    if (!authorization) {
      console.log("unauthorized: redirecting to login page...");
      res.redirect(301, "http://localhost:3000/login");

      return false;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
    } catch (err) {
      console.log(err);
      console.log("unauthorized: redirecting to login page...");
      res.redirect(301, "http://localhost:3000/login");
    }
  }
}
