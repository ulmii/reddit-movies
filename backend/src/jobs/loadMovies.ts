import {Container} from 'typedi';
import {Logger} from 'winston';
import {Job} from 'agenda';
import {getToken} from '../auth/redditToken';
import axios from 'axios';

export default class MovieJob {
  public async handler(job: Job, done: (err?: Error) => void): Promise<void> {
    const Logger: Logger = Container.get('logger');

    try {
      Logger.debug('Retrieving movie list');

      // FIXME: Sample request for now
      axios
        .get('https://oauth.reddit.com/api/v1/me', {
          headers: {Authorization: `Bearer ${await getToken()}`},
        })
        .then(res => {});

      done();
    } catch (e) {
      Logger.error('Error with Email Sequence Job: %o', e);
      done(e);
    }
  }
}
