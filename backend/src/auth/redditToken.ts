import axios from 'axios';
import {stringify} from 'querystring';
import config from '../config';
import Logger from '../loaders/logger';

let token: string;

export async function getToken() {
  if (token === undefined) {
    await generateToken();
  }

  return token;
}

export async function generateToken() {
  Logger.debug('Generating new reddit acces token');
  token = await axios({
    method: 'post',
    url: 'https://www.reddit.com/api/v1/access_token',
    data: stringify({
      grant_type: 'password',
      username: config.reddit.username,
      password: config.reddit.password,
    }),
    auth: {
      username: config.reddit.clientId,
      password: config.reddit.secret,
    },
    headers: {'User-Agent': 'MovieSpy/0.1 by Ulmii'},
  }).then(res => {
    return res.data.access_token;
  });
}
