import {Container} from 'typedi';
import LoggerInstance from './factories/logger';
import agendaFactory from './factories/agenda';
import {Db} from 'mongodb';
import * as Agenda from 'agenda';
import redditFactory from './factories/reddit';
import RedditService from '../services/reddit';

export default ({mongoConnection}: {mongoConnection: Db}) => {
  try {
    Container.set('logger', LoggerInstance);

    const agendaInstance: Agenda = agendaFactory({mongoConnection});
    Container.set('agendaInstance', agendaInstance);
    LoggerInstance.info('Agenda injected into container');

    const redditService: RedditService = redditFactory();
    Container.set('redditService', redditService);
    LoggerInstance.info('RedditService injected into container');

    return {agenda: agendaInstance};
  } catch (e) {
    LoggerInstance.error('Error on dependency injector loader: %o', e);
    throw e;
  }
};
