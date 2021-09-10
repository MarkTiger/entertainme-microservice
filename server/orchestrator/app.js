const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
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
        const { data: movies } = await moviesAPI.get('/');
        const { data: tvSeries } = await tvSeriesAPI.get('/');

        return {
          movies,
          tvSeries,
        };
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

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
