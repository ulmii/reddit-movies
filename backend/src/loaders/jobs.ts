import TokenGeneratorJob from '../jobs/generateToken';
import * as Agenda from 'agenda';
import MovieJob from '../jobs/loadMovies';

export default ({agenda}: {agenda: Agenda}) => {
  const movieJob = new MovieJob();
  agenda.define('load-movies', {concurrency: 1}, movieJob.handler);
  agenda.define(
    'generate-token',
    {priority: 'high', concurrency: 1},
    new TokenGeneratorJob().handler
  );

  agenda.on('ready', () => {
    agenda
      .every('3400 seconds', 'generate-token')
      .then(() => agenda.every('60 seconds', 'load-movies'))
      .then(() => agenda.start());
  });
};
