const { gql, UserInputError } = require('apollo-server');
const moviesAPI = require('../apis/moviesAPI');
const redis = require('../config/redis');

module.exports = {
  typeDef: gql`
    type Movie {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    input MovieInput {
      title: String!
      overview: String!
      poster_path: String!
      popularity: Float!
      tags: [String!]!
    }

    extend type Query {
      movies: [Movie]
      movie(id: ID!): Movie
    }

    extend type Mutation {
      createMovie(payload: MovieInput): String
      updateMovie(payload: MovieInput, id: ID!): String
      deleteMovie(id: ID!): String
    }
  `,
  resolvers: {
    Query: {
      async movies() {
        try {
          const allMovieCache = await redis.get('allMovie');

          if (allMovieCache) {
            const parsedCache = JSON.parse(allMovieCache);
            return parsedCache;
          } else {
            const { data } = await moviesAPI.get('/');
            const dataString = JSON.stringify(data);
            redis.set('allMovie', dataString);
            return data;
          }
        } catch (err) {
          return err;
        }
      },

      async movie(parent, args) {
        try {
          const movieId = redis.get('movieId');
          const oneMovieCache = redis.get('oneMovie');

          if (args.id === movieId && oneMovieCache) {
            const parsedCache = JSON.parse(oneMovieCache);
            return parsedCache;
          } else {
            const { data } = await moviesAPI.get(`/${args.id}`);
            if (Array.isArray(data)) {
              throw new UserInputError('Invalid movie ID');
            } else {
              const dataString = JSON.stringify(data);
              redis.set('movieId', args.id);
              redis.set('oneMovie', dataString);
              return data;
            }
          }
        } catch (err) {
          return err;
        }
      },
    },
    Mutation: {
      async createMovie(parent, args) {
        try {
          const { data } = await moviesAPI.post('/', args);
          redis.del('allData', 'allMovie');
          return data.insertedId;
        } catch (err) {
          return err;
        }
      },

      async updateMovie(parent, args) {
        try {
          await moviesAPI.put('/' + args.id, args);
          redis.del('allData', 'allMovie', 'oneMovie', 'movieId');
          return `Movie with id ${args.id} successfully updated`;
        } catch (err) {
          return err;
        }
      },

      async deleteMovie(parent, args) {
        try {
          await moviesAPI.delete('/' + args.id);
          redis.del('allData', 'allMovie', 'oneMovie', 'movieId');
          return `Movie with id ${args.id} successfully deleted`;
        } catch (err) {
          return err;
        }
      },
    },
  },
};
