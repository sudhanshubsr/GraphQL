import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import createGraphqlServer from './graphql/index.js';
import { decodeJWTToken } from './services/user.js';

const main = async () => {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running' });
  });

  app.use(
    '/graphql',
    expressMiddleware(await createGraphqlServer(), {
      context: async ({ req }) => {
        // @ts-ignore
        const token = req.headers.authorization || '';
        try {
          const user = decodeJWTToken(token);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  const PORT = Number(process.env.port) || 8000;

  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
  });
};

main();
