import config from '../../config';
import RedditService from '../../services/reddit';

export default () => {
  const movieQuery = config.reddit.movies.query;

  if (movieQuery === undefined) {
    throw Error('Reddit movie query not defined');
  }

  return new RedditService(movieQuery);
};
