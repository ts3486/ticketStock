import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
//Schema
import { buildSchema } from "type-graphql";
//Resolvers
import { UserResolver } from "./resolvers/auth/UserRevolver";
//Account
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./resolvers/auth/auth";
import { sendRefreshToken } from "./resolvers/auth/sendRefreshToken";
import { User } from "./entities/User";
import { EventResolver } from "./resolvers/event/EventResolver";
const cors = require("cors");

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  //token refresh REST requeset
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid; //jid is a custom name

    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      console.log("user null");
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      console.log("invalid user token version");
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  //creating a db connection with typeorm
  await createConnection()
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log(error, "db connection error");
    });

  const schema = await buildSchema({
    resolvers: [UserResolver, EventResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(5000, () => {
    console.log("Server Running at 5000");
  });
})().catch((error) => {
  console.log(error, "error");
});
