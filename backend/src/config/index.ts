import * as dotenv from 'dotenv';

dotenv.config();

if (process.env.AGENDA_CONCURRENCY === undefined) {
  process.env.AGENDA_CONCURRENCY = '5';
}

if (
  process.env.USERNAME === undefined ||
  process.env.PASSWORD === undefined ||
  process.env.CLIENT_ID === undefined ||
  process.env.REDDIT_SECRET === undefined
) {
  throw Error('No Reddit auth specified');
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

  reddit: {
    username: process.env.REDDIT_USER,
    password: process.env.PASSWORD,
    clientId: process.env.CLIENT_ID,
    secret: process.env.REDDIT_SECRET,
    movies: {
      query: process.env.REDDIT_MOVIE_QUERY,
    },
  },

  api: {
    prefix: '/api',
  },
};
