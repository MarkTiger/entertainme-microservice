require('dotenv').config();

const express = require("express");
const { gql } = require('apollo-server');
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const https = require("https");
const fs = require("fs");
const path = require("path")
const { merge } = require('lodash');
const {
  typeDef: movieTypeDef,
  resolvers: movieResolvers,
} = require('./schemas/movie');
const {
  typeDef: tvSeriesTypeDef,
  resolvers: tvSeriesResolvers,
} = require('./schemas/tvseries');
const moviesAPI = require('./apis/moviesAPI');
const tvSeriesAPI = require('./apis/tvSeriesAPI');
const redis = require('./config/redis');

const typeDefs = gql`
  type All {
    movies: [Movie]
    tvSeries: [TvSeries]
  }

  type Query {
    all: All
  }

  type Mutation
`;

const resolvers = {
  Query: {
    async all() {
      try {
        const allDataCache = await redis.get('allData');

        if (allDataCache) {
          const parsedCache = JSON.parse(allDataCache);
          return parsedCache;
        } else {
          const { data: movies } = await moviesAPI.get('/');
          const { data: tvSeries } = await tvSeriesAPI.get('/');
          const response = {
            movies,
            tvSeries,
          };
          const responseString = JSON.stringify(response);
          redis.set('allData', responseString);
          return response;
        }
      } catch (err) {
        return 'error';
      }
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieTypeDef, tvSeriesTypeDef],
  resolvers: merge(resolvers, movieResolvers, tvSeriesResolvers),
});

const server = new ApolloServer({ schema, debug: false });
server.start().then(() => {
  const app = express();
  server.applyMiddleware({ app });
  let httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, "privkey.pem"), { encoding: "utf8" }),
    cert: fs.readFileSync(path.join(__dirname, "fullchain.pem"), { encoding: "utf8" })
  }, app)

  return new Promise((resolve) => httpsServer.listen({ port: 80 }, resolve))
}).then(() => {
  console.log("Server ready at port 80")
})

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
