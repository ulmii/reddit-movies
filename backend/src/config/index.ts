import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  connectMongoDB: require('./mongodb'),
  api: {
    prefix: '/api',
  },
};
