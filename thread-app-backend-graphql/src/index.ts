import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createGraphqlServer from './graphql/index.js';

const main = async () => {
  const app = express();
  app.use(express.json());


  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running' });
  });

  app.use('/graphql', expressMiddleware(await createGraphqlServer()));

  const PORT = Number(process.env.port) || 8000;

  app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
  });
};

main();
