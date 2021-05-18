import config from './config';
import Logger from './loaders/logger';
import * as express from 'express';

async function startServer() {
  const app = express();

  await require('./loaders').default({expressApp: app});

  app
    .listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    )
    .on('error', err => {
      Logger.error(err);
      throw err;
    });
}

startServer();
