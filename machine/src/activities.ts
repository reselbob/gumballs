//import * as activity from '@temporalio/activity';
import {Gumball} from './resources/Interfaces';
import {logger} from './logger';
import axios from 'axios';

export const createActivities = (supplierURL: string, quantity: number) => {
  return {
    async buyGumballs(): Promise<Gumball[]> {
      //const {workflowExecution, activityId} = activity.Context.current().info;
      //const idempotencyToken = `${workflowExecution.workflowId}-${workflowExecution.runId}-${activityId}`;
      // make http call to supplier and provide idempotencyToken so the Supplier is respecting
      // this value as something akin to purchase order number // using idempotency token
      let strUrl = supplierURL;
      if (strUrl.substring(strUrl.length - 1) !== '/') {
        strUrl = strUrl + '/';
      }
      const url = `${strUrl}${quantity}`;
      logger.info(`Buying gumballs as ${url}`);
      const response = await axios.get(url);
      logger.info(`Bought gumballs as ${url}`);
      return response.data;
    },
  };
};
