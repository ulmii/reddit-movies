import {NextFunction, Request, Response, Router} from 'express';
import {Logger} from 'winston';
import {Container} from 'typedi';
import MoviesService from '../../services/movies';
import {celebrate, Joi, Segments} from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use(route);

  route.get(
    '/movies',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number(),
        offset: Joi.number(),
      },
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling GET movies endpoint');

      try {
        const limit: number | undefined = req.query.limit
          ? parseInt(<string>req.query.limit)
          : undefined;
        const offset: number | undefined = req.query.offset
          ? parseInt(<string>req.query.offset)
          : undefined;

        const moviesService: MoviesService = Container.get('moviesService');
        const movies = await moviesService.getMovies(limit, offset);

        return res.json(movies).status(200);
      } catch (e) {
        logger.error('Error: %o', e);
        return next(e);
      }
    }
  );
};
