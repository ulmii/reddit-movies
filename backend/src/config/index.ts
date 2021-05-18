export default {
  port: process.env.PORT,
  connectMongoDB: require('./mongodb'),
};
