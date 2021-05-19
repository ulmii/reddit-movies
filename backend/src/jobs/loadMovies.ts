import {Container} from 'typedi';
import {Logger} from 'winston';
import {Job} from 'agenda';
import RedditService from '../services/reddit';

export default class MovieJob {
  public async handler(job: Job, done: (err?: Error) => void): Promise<void> {
    const Logger: Logger = Container.get('logger');
    const redditInstance: RedditService = Container.get('redditService');

    try {
      Logger.debug('Retrieving movie list');

      const movies: Array<{
        title: string;
        name: string;
        created: Date;
      }> = await redditInstance.getMovies();

      const result: {
        isBaseLoaded: boolean;
        after: string;
      } = await redditInstance.loadMovies(movies);

      if (!result.isBaseLoaded) {
        Logger.info('Initializing movie base');
        await redditInstance.initMoviesToDb(result.after);
      }

      done();
    } catch (e) {
      Logger.error('Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
}
