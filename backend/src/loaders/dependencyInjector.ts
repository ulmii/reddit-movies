import {Container} from 'typedi';
import LoggerInstance from './logger';
import agendaFactory from './agenda';
import {Db} from 'mongodb';
import * as Agenda from 'agenda';

export default ({mongoConnection}: {mongoConnection: Db}) => {
  try {
    const agendaInstance: Agenda = agendaFactory({mongoConnection});

    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', LoggerInstance);

    LoggerInstance.info('Agenda injected into container');

    return {agenda: agendaInstance};
  } catch (e) {
    LoggerInstance.error('Error on dependency injector loader: %o', e);
    throw e;
  }
};
