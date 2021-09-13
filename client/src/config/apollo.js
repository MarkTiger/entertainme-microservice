import { ApolloClient, InMemoryCache } from '@apollo/client';
import { favoriteMoviesVar } from '../helpers/reactiveVar';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
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
