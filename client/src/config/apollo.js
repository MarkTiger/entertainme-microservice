import { ApolloClient, InMemoryCache } from '@apollo/client';
import { favoriteMoviesVar } from '../helpers/reactiveVar';

const client = new ApolloClient({
  uri: 'https://entertainme-api.marcotiger.my.id/graphql',
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
