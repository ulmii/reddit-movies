import config from './config';
import Logger from './loaders/logger';

// const db = require('./db')
// const movieRouter = require('./routes/movie-router')
import * as express from 'express';


// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
// app.use(bodyParser.json())
//
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
//
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
//
// app.use('/api', movieRouter)


async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  app
    .listen(config.port, () =>
      console.log(`Server running on port ${config.port}`),
    )
    .on('error', err => {
      Logger.error(err);
      throw err;
    });
}


startServer();