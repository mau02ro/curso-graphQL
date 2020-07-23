"use strict";

require("dotenv").config();
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers");
const cors = require("cors");

const app = express();
app.set("PORT", process.env.port || 3000);
debugger;

// definiendo el esquema
const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql")
).toString();
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

// Definimos una ruta para '/api' que va a ejecutar el graphqlHTTP
app.use(
  "/api",
  graphqlHTTP({
    schema: schema, // esquemas
    rootValue: resolvers, // resolvers
    graphiql: true, // entorno de desarrollo de graphql
  })
);

app.listen(app.get("PORT"), () => {
  console.log(`Server on listening at http://localhost:${app.get("PORT")}/api`);
});
