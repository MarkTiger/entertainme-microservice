const { gql } = require('apollo-server');
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

    extend type Query {
      tvSeries: [TvSeries]
      tvSeriesOne(id: ID!): TvSeries
    }
  `,
  resolvers: {
    Query: {
      async tvSeries() {
        try {
          const { data } = await tvSeriesAPI.get('/');
          return data;
        } catch (err) {
          return 'error';
        }
      },

      async tvSeriesOne(parent, args) {
        try {
          const { data } = await tvSeriesAPI.get('/' + args.id);
          return data;
        } catch (err) {
          return 'error';
        }
      },
    },
  },
};
