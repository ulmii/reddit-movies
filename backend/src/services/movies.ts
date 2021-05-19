import {Container} from 'typedi';
import {Logger} from 'winston';
import {Models} from '../types';
import {IRedditPost} from '../interfaces/IRedditPost';
import RedditPostModel = Models.RedditPostModel;

export default class MoviesService {
  private logger: Logger;
  private redditPostModel: RedditPostModel;

  constructor() {
    this.logger = Container.get('logger');
    this.redditPostModel = Container.get('redditPostModel');
  }

  public async getMovies(limit = 5, offset = 0): Promise<IRedditPost[]> {
    return this.redditPostModel
      .find()
      .sort('-created')
      .skip(offset)
      .limit(limit)
      .then(r => {
        return r;
      });
  }
}
