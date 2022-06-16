import express from 'express';
import {logger} from './logger';
import {Inventory} from '../resources/Inventory';

import {Gumball, Color, Flavor} from '../resources/Gumball';
//import {GumballBuyer} from '../resources/GumballBuyer';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/gumballs', (_req, res) => {
    const arr = new Array<Gumball>();
    arr.push(new Gumball(Color.Red, Flavor.Cherry));
    arr.push(new Gumball(Color.Green, Flavor.Spearmint));
    logger.info(`sending ${JSON.stringify(arr)}`);
    res.send(arr);
  });

  app.get('/gumball', async (_req, res) => {
    const gumball = await Inventory.get();
    res.send(gumball);
  });
  /*
  app.get('/buygumball', async (_req, res) => {
    const buyer: GumballBuyer = new GumballBuyer();
    const data = await buyer.buy();
    res.send(data);
  });
*/

  return app;
};

export {createServer};
