require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers");
const connectDB = require("./db/mongoose");

const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });

(async () => {
  await connectDB();
  await server.start();
  app.use(express.json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log("Wünsche-Service läuft auf http://localhost:4000");
  });
})();
