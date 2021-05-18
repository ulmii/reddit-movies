import {Job} from 'agenda';
import {Container} from 'typedi';
import {Logger} from 'winston';
import RedditService from '../services/reddit';

export default class TokenGeneratorJob {
  public async handler(job: Job, done: (err?: Error) => void): Promise<void> {
    const Logger: Logger = Container.get('logger');
    const redditInstance: RedditService = Container.get('redditService');

    try {
      Logger.debug('Refreshing reddit access token');

      await redditInstance.generateToken();
      done();
    } catch (e) {
      done(e);
    }
  }
}
