import { ApolloClient, InMemoryCache } from '@apollo/client';
import { favoriteMoviesVar } from '../helpers/reactiveVar';

const client = new ApolloClient({
  uri: 'http://13.250.40.110',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favoriteMovies: {
            read() {
              return favoriteMoviesVar();
            },
          },
        },
      },
    },
  }),
});

export default client;
