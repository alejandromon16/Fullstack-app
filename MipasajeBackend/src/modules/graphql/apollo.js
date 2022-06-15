import {ApolloServer} from 'apollo-server';
import resolvers from '../../resolvers';
import typeDefs from './schema';

export async function startServer() {
  const server = new ApolloServer({
    // When false, stack trace is not output in the response on error
    debug: true,
    typeDefs: typeDefs,
    resolvers: resolvers,
    formatError: (error) => {
      const formattedError = {
        message: error.message,
        locations: error.locations,
        extensions: {...error.extensions, name: error.name},
        // extensions: {
        //   name: error.name,
        //   code: error.extensions?.code,
        // },
      };
      return formattedError;
    },
  });

  server.listen().then(({url}) => {
    console.log(`Server ready at URL ${url}`);
  });
}
