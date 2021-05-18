import expressLoader from './express';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
import * as express from 'express';
import agendaFactory from './agenda';

export default async ({expressApp}: {expressApp: express.Application}) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  // const userModel = {
  //   name: 'userModel',
  //   // Notice the require syntax and the '.default'
  //   model: require('../models/user').default,
  // };

  // It returns the agenda instance because it's needed in the subsequent loaders
  // const { agenda } = await dependencyInjectorLoader({
  //   mongoConnection,
  //   models: [
  //     userModel,
  //     // salaryModel,
  //     // whateverModel
  //   ],
  // });
  Logger.info('✌️ Dependency Injector loaded');

  const agenda = agendaFactory({ mongoConnection });
  jobsLoader({agenda});
  Logger.info('✌️ Jobs loaded');

  expressLoader({app: expressApp});
  Logger.info('✌️ Express loaded');
};
