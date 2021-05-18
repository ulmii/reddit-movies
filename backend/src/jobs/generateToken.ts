import {Job} from 'agenda';
import {generateToken} from '../auth/redditToken';
import {Container} from 'typedi';
import {Logger} from 'winston';

export default class TokenGeneratorJob {
  public async handler(job: Job, done: (err?: Error) => void): Promise<void> {
    const Logger: Logger = Container.get('logger');

    try {
      Logger.debug('Refreshing reddit access token');

      await generateToken();
      done();
    } catch (e) {
      done(e);
    }
  }
}
