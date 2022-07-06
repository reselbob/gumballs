import {AddressInfo} from 'net';
import http from 'http';
import {logger} from './logger';
import express from 'express';
import {Gumball} from './resources/Gumball';

const inventory = new Array<Gumball>();

// eslint-disable-next-line node/no-extraneous-import
import {WorkflowClient} from '@temporalio/client';
import {buyMoreWorkflow} from './workflow';

const client = new WorkflowClient();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5022';

const loadMachine = async () => {
  logger.info('Buying gumballs');
  const result = await client.execute(buyMoreWorkflow, {
    taskQueue: 'gumball-buying',
    workflowId: '1000',
  });
  const boughtGumballs = Object.assign([], result);
  logger.info(`Received ${boughtGumballs.length} gumballs`);
  inventory.concat(boughtGumballs);
};

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.disable('x-powered-by');
  app.get('/gumballs', (_req, res) => {
    res.send(inventory);
  });

  app.get('/gumball', async (_req, res) => {
    if (inventory.length === 0) {
      await loadMachine();
    }
    res.send(inventory.shift());
  });

  return app;
};

async function startServer() {
  const app = createServer();
  const server = http.createServer(app).listen({host, port}, () => {
    const addressInfo = server.address() as AddressInfo;
    loadMachine().then(() => {
      logger.info(
        `Gumball machine is ready at http://${addressInfo.address}:${addressInfo.port}`
      );
    });
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
