// eslint-disable-next-line node/no-extraneous-import
import * as wf from '@temporalio/workflow';
import type {createActivities} from './activities';
import {Gumball} from './resources/Interfaces';

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
    await wf.condition(() => inventory.length !== 0);
    const gumball = inventory.shift();
    requestIdToGumball.set(requestId, gumball);
  });

  wf.setHandler(dispenseGumballQuery, requestId =>
    requestIdToGumball.get(requestId)
  );

  wf.setHandler(getGumballsQuery, requestId => inventory);

  function shouldBuyGumballs() {
    return inventory.length === 0;
  }

  while (wf.taskInfo().historyLength < 2000) {
    await wf.condition(shouldBuyGumballs);
    inventory.concat(await buyGumballs());
  }
  await wf.continueAsNew<typeof gumballMachineWorkflow>(
    inventory,
    requestIdToGumball
  );
}
