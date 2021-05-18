import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import routes from '../api';
import config from '../config';
import HttpException from '../api/exceptions/HttpException';
import * as morgan from 'morgan';

export default ({app}: {app: express.Application}) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Request logging
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  );

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new HttpException(404, 'Not Found');
    next(err);
  });

  app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    }
  );
};
