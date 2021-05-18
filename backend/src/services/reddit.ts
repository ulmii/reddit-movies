import {Container} from 'typedi';
import {Logger} from 'winston';
import axios from 'axios';
import {stringify} from 'querystring';
import config from '../config';

export default class RedditService {
  public static url = 'https://oauth.reddit.com/r/movies/search';
  private token?: string;
  private logger: Logger;
  private readonly movieQuery: string;

  constructor(query: string) {
    this.logger = Container.get('logger');
    this.movieQuery = query;
  }

  public async getMovies(count = 25, after?: string) {
    const apiRq =
      RedditService.url +
      this.movieQuery +
      `&count=${count}` +
      `${after === undefined ? '' : '&after=' + after}`;

    const posts: Array<{
      kind: string;
      data: {title: string; name: string};
    }> = await axios
      .get(apiRq, {
        headers: {Authorization: `Bearer ${await this.getToken()}`},
      })
      .then(res => res.data.data.children);

    posts.forEach(post => {
      console.log('Post: ' + post.data.name + ', ' + post.data.title);
    });
  }

  public async getShows(count: number, after: string) {
    const s = await this.getToken();
  }

  public async getToken() {
    if (this.token === undefined) {
      await this.generateToken();
    }

    return this.token;
  }

  public async generateToken() {
    this.logger.debug('Generating new reddit acces token');
    this.token = await axios({
      method: 'post',
      url: 'https://www.reddit.com/api/v1/access_token',
      data: stringify({
        grant_type: 'password',
        username: config.reddit.username,
        password: config.reddit.password,
      }),
      auth: {
        username: config.reddit.clientId,
        password: config.reddit.secret,
      },
      headers: {'User-Agent': 'MovieSpy/0.1 by Ulmii'},
    }).then(res => {
      return res.data.access_token;
    });
  }
}
