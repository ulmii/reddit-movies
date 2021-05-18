import * as dotenv from 'dotenv';
dotenv.config();

if (process.env.AGENDA_CONCURRENCY === undefined) {
  process.env.AGENDA_CONCURRENCY = '5';
}

export default {
  port: process.env.PORT,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  mongoose: {
    databaseURL: process.env.MONGODB_URI,
  },

  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  api: {
    prefix: '/api',
  },
};
