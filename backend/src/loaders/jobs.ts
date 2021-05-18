import MovieJob from '../jobs/loadMovies';
import TokenGeneratorJob from '../jobs/generateToken';
import * as Agenda from 'agenda';

export default ({agenda}: {agenda: Agenda}) => {
  agenda.define('load-movies', {concurrency: 10}, new MovieJob().handler);
  agenda.define(
    'generate-token',
    {priority: 'high', concurrency: 10},
    new TokenGeneratorJob().handler
  );

  agenda.on('ready', () => {
    agenda
      .every('3400 seconds', 'generate-token')
      .then(() => agenda.every('1 seconds', 'load-movies'));

    agenda.start();
  });
};
