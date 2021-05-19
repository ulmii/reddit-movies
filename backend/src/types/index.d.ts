import {Document, Model} from 'mongoose';
import {IRedditPost} from '../interfaces/IRedditPost';

export namespace Models {
  export type RedditPostModel = Model<IRedditPost & Document>;
}
