import {Container} from 'typedi';
import {Logger} from 'winston';
import axios from 'axios';
import {stringify} from 'querystring';
import config from '../config';
import {Models} from '../types';
import RedditPostModel = Models.RedditPostModel;

export default class RedditService {
  public static url = 'https://oauth.reddit.com/r/movies/search';
  private redditPostModel: RedditPostModel;
  private token?: string;
  private logger: Logger;
  private readonly movieQuery: string;

  constructor(query: string) {
    this.logger = Container.get('logger');
    this.redditPostModel = Container.get('redditPostModel');
    this.movieQuery = query;
  }

  public async getMovies(limit = 5, after?: string) {
    const apiRq =
      RedditService.url +
      this.movieQuery +
      `&limit=${limit}` +
      `${after === undefined ? '' : '&after=' + after}`;

    return await axios
      .get(apiRq, {
        headers: {Authorization: `Bearer ${await this.getToken()}`},
      })
      .then(res =>
        res.data.data.children.flatMap(
          (post: {data: {title: string; name: string; created: number}}) => {
            return {
              name: post.data.name,
              title: post.data.title,
              created: new Date(post.data.created * 1000),
            };
          }
        )
      );
  }

  public async getShows(limit: number, after: string) {
    const s = await this.getToken();
  }

  public async loadMovies(
    movies: Array<{title: string; name: string; created: Date}>
  ) {
    const movieIds = movies.map(s => s.name);
    this.logger.info(`Checking movies with ids: ${movieIds}`);

    let isBaseLoaded = true;
    let after = '';
    for (const movie of movies) {
      const result = await this.redditPostModel
        .exists({name: movie.name})
        .then(exists => {
          if (!exists) {
            this.redditPostModel.create({
              ...movie,
            });
          }

          return exists;
        });

      after = movie.name;
      isBaseLoaded = result;
    }
    return {isBaseLoaded, after};
  }

  public async initMoviesToDb(after: string) {
    let dbLoaded = false;
    let afterTmp = after;
    while (!dbLoaded) {
      this.logger.info(`Loading movies after id: ${afterTmp}`);
      const movies: Array<{
        title: string;
        name: string;
        created: Date;
      }> = await this.getMovies(100, afterTmp);

      const newVar: {
        isBaseLoaded: boolean;
        after: string;
      } = await this.loadMovies(movies);
      dbLoaded = newVar.isBaseLoaded;
      afterTmp = newVar.after;
    }
  }

  public async getToken() {
    if (this.token === undefined) {
      await this.generateToken();
    }

    return this.token;
  }

  public async generateToken() {
    this.logger.debug('Generating new reddit access token');
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
