const { gql } = require('apollo-server');
const moviesAPI = require('../apis/moviesAPI');

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
          const { data } = await moviesAPI.get('/');
          return data;
        } catch (err) {
          return 'error';
        }
      },

      async movie(parent, args) {
        try {
          const { data } = await moviesAPI.get('/' + args.id);
          return data;
        } catch (err) {
          return 'error';
        }
      },
    },
    Mutation: {
      async createMovie(parent, args) {
        try {
          const { data } = await moviesAPI.post('/', args);
          return data.insertedId;
        } catch (err) {
          return 'error';
        }
      },

      async updateMovie(parent, args) {
        try {
          await moviesAPI.put('/' + args.id, args);
          return `Movie with id ${args.id} successfully updated`;
        } catch (err) {
          return 'error';
        }
      },

      async deleteMovie(parent, args) {
        try {
          await moviesAPI.delete('/' + args.id);
          return `Movie with id ${args.id} successfully deleted`;
        } catch (err) {
          return 'error';
        }
      },
    },
  },
};
