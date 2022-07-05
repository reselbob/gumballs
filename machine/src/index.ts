import {AddressInfo} from 'net';
import http from 'http';
import {logger} from './logger';
import express from 'express';
import {Color, Flavor, Gumball} from './resources/Gumball';
import {Inventory} from './resources/Inventory';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5022';

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

  return app;
};

async function startServer() {
  const app = createServer();
  const server = http.createServer(app).listen({host, port}, () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(
      `Server ready at http://${addressInfo.address}:${addressInfo.port}`
    );
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach(type => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`);

      server.close(() => {
        logger.debug('HTTP server closed');
      });
    });
  });

  return server;
}

module.exports = {startServer};
startServer();
