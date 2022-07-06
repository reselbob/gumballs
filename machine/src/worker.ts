// eslint-disable-next-line node/no-extraneous-import
import {Worker} from '@temporalio/worker';
import {logger} from './logger';

// @@@SNIPSTART typescript-activity-deps-worker
import {createActivities} from './activities';

async function run() {
  const worker = await Worker.create({
    taskQueue: 'gumball-buying',
    workflowsPath: require.resolve('./workflows'),
    activities: createActivities(),
  });

  await worker.run();
}

run().catch(err => {
  logger.error(err);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
// @@@SNIPEND
