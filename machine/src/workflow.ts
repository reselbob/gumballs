// eslint-disable-next-line node/no-extraneous-import
import {proxyActivities} from '@temporalio/workflow';

// @@@SNIPSTART typescript-activity-deps-workflow
import type {createActivities} from './activities';
import {Gumball} from './resources/Gumball';

// Note usage of ReturnType<> generic since createActivities is a factory function
const {buy} = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '30 seconds',
});
// @@@SNIPEND

export async function buyMoreWorkflow(): Promise<Array<Gumball>> {
  const errMessage =
    'The required environment variable SUPPLIER_URL does not exist or has no value.';
  if (!process.env.SUPPLIER_URL) throw new Error(errMessage);
  let mStr = process.env.SUPPLIER_URL;
  //if the last character is not a /, add one
  if (mStr.substr(mStr.length - 1) !== '/') {
    mStr = mStr + '/';
  }
  const quantity = process.env.STANDING_ORDER_COUNT || '10';
  const url = mStr;

  const gumballs = await buy(url, parseInt(quantity, 10));
  return gumballs;
}
