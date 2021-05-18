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
      //FIXME: Placeholder
      redditInstance.getMovies();

      done();
    } catch (e) {
      Logger.error('Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
}
