const { gql, UserInputError } = require('apollo-server');
const tvSeriesAPI = require('../apis/tvSeriesAPI');

module.exports = {
  typeDef: gql`
    type TvSeries {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    input TvInput {
      title: String!
      overview: String!
      poster_path: String!
      popularity: Float!
      tags: [String!]!
    }

    extend type Query {
      tvSeries: [TvSeries]
      tvSeriesOne(id: ID!): TvSeries
    }

    extend type Mutation {
      createTvSeries(payload: TvInput): String
      updateTvSeries(payload: TvInput, id: ID!): String
      deleteTvSeries(id: ID!): String
    }
  `,
  resolvers: {
    Query: {
      async tvSeries() {
        try {
          const { data } = await tvSeriesAPI.get('/');
          return data;
        } catch (err) {
          return err;
        }
      },

      async tvSeriesOne(parent, args) {
        try {
          const { data } = await tvSeriesAPI.get('/' + args.id);
          if (Array.isArray(data)) {
            throw new UserInputError('Invalid TV Series ID');
          } else {
            return data;
          }
        } catch (err) {
          return err;
        }
      },
    },

    Mutation: {
      async createTvSeries(parent, args) {
        try {
          const { data } = await tvSeriesAPI.post('/', args);
          return data.insertedId;
        } catch (err) {
          return err;
        }
      },

      async updateTvSeries(parent, args) {
        try {
          await tvSeriesAPI.put('/' + args.id, args);
          return `Tv Series with id ${args.id} successfully updated`;
        } catch (err) {
          return err;
        }
      },

      async deleteTvSeries(parent, args) {
        try {
          await tvSeriesAPI.delete('/' + args.id);
          return `Tv Series with id ${args.id} successfully deleted`;
        } catch (err) {
          return err;
        }
      },
    },
  },
};
