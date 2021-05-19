import expressLoader from './express';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './factories/logger';
import * as express from 'express';
import dependencyInjectorLoader from './dependencyInjector';

export default async ({expressApp}: {expressApp: express.Application}) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('DB loaded and connected!');

  const redditPostModel = {
    name: 'redditPostModel',
    model: require('../models/redditPost').default,
  };

  const {agenda} = await dependencyInjectorLoader({
    mongoConnection,
    models: [redditPostModel],
  });
  Logger.info('Dependency Injector loaded');

  expressLoader({app: expressApp});
  Logger.info('Express loaded');

  jobsLoader({agenda});
  Logger.info('Jobs loaded');
};
