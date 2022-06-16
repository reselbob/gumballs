import express from 'express';

import {Gumball, Color, Flavor} from '../resources/Gumball';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.get('/gumballs', (_req, res) => {
    const arr = new Array<Gumball>();
    arr.push(new Gumball(Color.Red, Flavor.Cherry));
    arr.push(new Gumball(Color.Green, Flavor.Spearmint));
    res.send(arr);
  });

  app.get('/gumball', (_req, res) => {
    const gumball: Gumball = new Gumball(Color.Red, Flavor.Cherry);
    res.send(gumball);
  });

  return app;
};

export {createServer};
