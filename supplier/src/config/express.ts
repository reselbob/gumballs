import express from 'express';
import {logger} from './logger';
import {GumballFactory} from '../resources/GumballFactory';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/gumballs/:count', (_req, res) => {
    let cnt = 0;
    if (isNumber(_req.params.count)) cnt = parseInt(_req.params.count, 10);
    const arr = new GumballFactory().getGumballs(cnt);
    logger.info(`sending some gumballs ${arr}`);
    res.send(arr);
  });
  return app;
};

const isNumber = function isNumber(value) {
  return !isNaN(value);
};

export {createServer};
