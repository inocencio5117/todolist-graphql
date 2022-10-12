import "reflect-metadata";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// import { DataSource } from "typeorm";

import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground";
// import { Task } from "./entities/Task";

const main = async () => {
  // const conn = new DataSource({
  //   type: "postgres",
  //   database: "todolist-graphql-db",
  //   entities: [Task],
  //   synchronize: true,
  //   username: "postgres",
  //   password: "postgres",
  //   port: 5432,
  // });

  // await conn.initialize();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("Health check!"));

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

main().catch((err) => console.error(err));
