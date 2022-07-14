import {AddressInfo} from 'net';
import http from 'http';
import {logger} from './logger';
import express from 'express';
//import {Gumball} from './resources/Gumball';
import {Config} from './config';
import {nanoid} from 'nanoid';

import 'dotenv/config';

// eslint-disable-next-line node/no-extraneous-import
import {WorkflowClient} from '@temporalio/client';
import {
  dispenseGumballQuery,
  dispenseGumballSignal,
  getGumballsQuery,
  gumballMachineWorkflow,
} from './workflow';

const client = new WorkflowClient();

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || '5022';
const workflowId = nanoid();

const connectToTemporalIo = async () => {
  logger.info('Buying gumballs');
  const result = await client.start(gumballMachineWorkflow, {
    taskQueue: Config.queueName,
    workflowId: workflowId,
  });
  logger.info(`Connected to workflow ${JSON.stringify(result)}`);
};

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.disable('x-powered-by');
  app.get('/gumballs', async (_req, res) => {
    try {
      const handle = client.getHandle(workflowId);
      const requestId = nanoid();
      const gumballs = await handle.query(getGumballsQuery, requestId);
      res.send(gumballs);
    } catch (e) {
      const err = e as Error;
      logger.error(err.message);
    }
  });

  app.get('/gumballs/quantity', async (_req, res) => {
    try {
      const handle = client.getHandle(workflowId);
      const requestId = nanoid();
      const gumballs = await handle.query(getGumballsQuery, requestId);
      res.send({quantity: gumballs.length});
    } catch (e) {
      const err = e as Error;
      logger.error(err.message);
    }
  });

  app.get('/gumball', async (_req, res) => {
    try {
      const handle = client.getHandle(workflowId);
      const requestId = nanoid();
      await handle.signal(dispenseGumballSignal, requestId);
      const gumball = await handle.query(dispenseGumballQuery, requestId);
      res.send(gumball);
    } catch (e) {
      const err = e as Error;
      logger.error(err.message);
    }
  });

  return app;
};

async function startServer() {
  const app = createServer();
  const server = http.createServer(app).listen({host, port}, () => {
    const addressInfo = server.address() as AddressInfo;
    connectToTemporalIo()
      .then(() => {
        logger.info(
          `Gumball machine is ready at http://${addressInfo.address}:${addressInfo.port}`
        );
      })
      .catch(e => {
        const err = e as Error;
        logger.error(err.message);
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
startServer().then(() => logger.info('startServer called'));
