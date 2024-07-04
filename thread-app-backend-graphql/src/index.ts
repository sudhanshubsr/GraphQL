import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { prisma } from './lib/db.js';

const main = async () => {
  const app = express();
  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query{
            hello: String
            say(name:String): String
        }
        type Mutation{
          createUser(firstName: String, lastName: String, email:String, password:String) : Boolean
        }

    `, 
    resolvers: {
      Query: {
        hello: () => `Hey there, I am a graphql server`,
        say: (parent, { name }: { name: string }) => `Hey my name is ${name}`,
      },
      Mutation: {
        createUser: async (
          parent,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prisma.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: 'random_salt',
            },
          });
          return true;
        },
      },
    }, //query and mutation resolvers
  });

  await gqlServer.start();

  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running' });
  });

  app.use('/graphql', expressMiddleware(gqlServer));

  const PORT = Number(process.env.port) || 8000;

  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
  });
};

main();
