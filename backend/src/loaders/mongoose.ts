import * as mongoose from 'mongoose';
import {Db} from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  if (config.mongoose.databaseURL !== undefined) {
    const connection = await mongoose.connect(config.mongoose.databaseURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    return connection.connection.db;
  }

  throw Error('Mongoose url not defined');
};
