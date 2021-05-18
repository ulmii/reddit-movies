import * as Agenda from 'agenda';
import config from '../config';
import {Db} from 'mongodb';

export default ({mongoConnection}: {mongoConnection: Db}) => {
  return new Agenda({
    mongo: mongoConnection,
    db: {collection: config.agenda.dbCollection},
    processEvery: config.agenda.pooltime,
    maxConcurrency: config.agenda.concurrency,
  });
};
