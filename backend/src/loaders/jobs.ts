import TokenGeneratorJob from '../jobs/generateToken';
import * as Agenda from 'agenda';
import MovieJob from '../jobs/loadMovies';

export default ({agenda}: {agenda: Agenda}) => {
  const movieJob = new MovieJob();
  agenda.define('load-movies', {concurrency: 10}, movieJob.handler);
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
