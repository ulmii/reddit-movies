import * as Agenda from 'agenda';

export default ({agenda}: {agenda: Agenda}) => {
  agenda.define('start new play', function(job, done) {
    console.log('Siema 😎🤙');
    done();
  });
  agenda.on('ready', function() {
    agenda.every('1 seconds', 'start new play');
    agenda.start();
  });

};
