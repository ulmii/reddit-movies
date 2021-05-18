import expressLoader from './express';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './factories/logger';
import * as express from 'express';
import dependencyInjectorLoader from './dependencyInjector';

export default async ({expressApp}: {expressApp: express.Application}) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('DB loaded and connected!');

  const {agenda} = await dependencyInjectorLoader({
    mongoConnection,
  });
  Logger.info('Dependency Injector loaded');

  jobsLoader({agenda});
  Logger.info('Jobs loaded');

  expressLoader({app: expressApp});
  Logger.info('Express loaded');
};
