// eslint-disable-next-line node/no-extraneous-import
import * as wf from '@temporalio/workflow';
import type {createActivities} from './activities';
import {Gumball} from './resources/Interfaces';
import {LoggerSinks} from './resources/Interfaces';
const {logger} = wf.proxySinks<LoggerSinks>();

// Note usage of ReturnType<> generic since createActivities is a factory function
const {buyGumballs} = wf.proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '30 seconds',
});

export const numGumballsQuery = wf.defineQuery<number>('numGumballs');
export const getGumballsQuery = wf.defineQuery<
  Array<Gumball>,
  [string] | undefined
>('getGumballs');

export const dispenseGumballSignal =
  wf.defineSignal<[string]>('dispenseGumball');

export const dispenseGumballQuery = wf.defineQuery<
  Gumball | undefined,
  [string]
>('dispenseGumball');

export async function gumballMachineWorkflow(
  inventory = Array<Gumball>(),
  requestIdToGumball = new Map<string, Gumball | undefined>()
): Promise<void> {
  wf.setHandler(numGumballsQuery, () => inventory.length);

  wf.setHandler(dispenseGumballSignal, async requestId => {
    //check if there's a gumball, if not buy some
    logger.info(
      `Starting inventory count in dispenseGumballSignal is ${inventory.length}`
    );
    await wf.condition(() => inventory.length !== 0);
    logger.info(`Inventory count after we.condition is ${inventory.length}`);
    const gumball = inventory.shift();
    logger.info(
      `Setting gumball ${JSON.stringify(gumball)} for requestId ${requestId}`
    );
    requestIdToGumball.set(requestId, gumball);
  });

  wf.setHandler(dispenseGumballQuery, requestId =>
    requestIdToGumball.get(requestId)
  );

  wf.setHandler(getGumballsQuery, requestId => inventory);

  function shouldBuyGumballs() {
    logger.info(
      `The current number of gumballs in stock is ${inventory.length}`
    );
    return inventory.length === 0;
  }

  while (wf.taskInfo().historyLength < 2000) {
    await wf.condition(shouldBuyGumballs);
    logger.info('Getting gumballs in because inventory has gone to zero');
    const gbs = await buyGumballs();
    logger.info('Filling gumballs inventory');
    gbs.forEach(gb => {
      inventory.push(gb);
    });
    logger.info('Filled gumballs inventory');
  }
  await wf.continueAsNew<typeof gumballMachineWorkflow>(
    inventory,
    requestIdToGumball
  );
}
