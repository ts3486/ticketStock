//Account
import { User } from "../../entities/User";
import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { sendRefreshToken } from "./sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

export const authResolver: IResolvers = {
  Query: {
    auth: (_, __, { context, res }) => {
      const authorization = context.req.headers["authorization"];

      if (!authorization) {
        res.status(301).redirect("https://localhost:3000");
      }
    },

    user: (_, __, { context }) => {
      const authorization = context.req.headers["authorization"];

      if (!authorization) {
        return null;
      }

      try {
        const token = authorization.split(" ")[1];
        const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        return User.findOne(payload.userId);
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },

  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword,
      }).save();

      return true;
    },

    login: async (_, { email, password }, { res }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return "user does not exist";
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return "wrong password";
      }

      const { accessToken, refreshToken } = createTokens(user);

      res.cookie("refresh-token", refreshToken);
      res.cookie("access-token", accessToken);

      return {
        accessToken,
        user,
      };
    },

    logout: async (_, __, { req, res }) => {
      sendRefreshToken(res, "");

      return true;
      // if (!req.userId) {
      //   return false;
      // }

      // const user = await User.findOne(req.userId);
      // if (!user) {
      //   return false;
      // }

      // await user.save();

      // res.clearCookie("access-token");

      // return true;
    },

    revokeRefreshTokensForUser: async (userId: number) => {
      await getConnection().getRepository(User).increment({ id: userId }, "tokenVersion", 1);

      return true;
    },
  },
};

//A graphql schema = resolvers = the request function.
