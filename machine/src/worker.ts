// eslint-disable-next-line node/no-extraneous-import
import {Worker} from '@temporalio/worker';
import {logger} from './logger';
import {Config} from './config';

import {createActivities} from './activities';

async function run() {
  const errMessage =
    'The required environment variable SUPPLIER_URL does not exist or has no value.';
  if (!process.env.SUPPLIER_URL) throw new Error(errMessage);
  let mStr = process.env.SUPPLIER_URL;
  //if the last character is not a /, add one
  if (mStr.substring(mStr.length - 1) !== '/') {
    mStr = mStr + '/';
  }
  const quantity = process.env.STANDING_ORDER_COUNT || '10';
  const url = mStr;
  if (!isNumber(quantity)) {
    const errMsg = `The value ${quantity} is not a number`;
    throw new Error(errMsg);
  }

  const worker = await Worker.create({
    taskQueue: Config.queueName,
    workflowsPath: require.resolve('./workflows'),
    activities: createActivities(url, parseInt(quantity)),
  });

  await worker.run();
}

run().catch(err => {
  logger.error(err);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

function isNumber(str: string): boolean {
  if (typeof str !== 'string') {
    return false;
  }

  if (str.trim() === '') {
    return false;
  }

  return !Number.isNaN(Number(str));
}
