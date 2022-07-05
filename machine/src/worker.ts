import {Worker} from '@temporalio/worker';
import axios from 'axios';
import {logger} from './logger';

// @@@SNIPSTART typescript-activity-deps-worker
import {createActivities} from './activities';

async function run() {
  const worker = await Worker.create({
    taskQueue: 'dependency-injection',
    workflowsPath: require.resolve('./workflows'),
    activities: createActivities(axios),
  });

  await worker.run();
}

run().catch(err => {
  logger.error(err);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
// @@@SNIPEND
