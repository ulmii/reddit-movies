import * as mongoose from 'mongoose';
import {IRedditPost} from '../interfaces/IRedditPost';

const RedditPost = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    index: false,
  },
  created: {
    type: Date,
    required: true,
    index: true,
  },
});

export default mongoose.model<IRedditPost & mongoose.Document>(
  'RedditPost',
  RedditPost
);
