import { ApolloServer } from '@apollo/server';
import User from './User/index.js';

const createGraphqlServer = async () => {
  const gqlServer = new ApolloServer({
    typeDefs: `
            type Query{
                hello: String
            }
            type Mutation{
              ${User.mutations}
            }

        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
};

export default createGraphqlServer;
