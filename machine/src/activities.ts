//import * as activity from '@temporalio/activity';
import {Gumball} from './workflow';
import {logger} from './logger';
import axios from 'axios';

export const createActivities = (supplierURL: string, quantity: number) => {
  return {
    async buyGumballs(): Promise<Gumball[]> {
      //const {workflowExecution, activityId} = activity.Context.current().info;
      //const idempotencyToken = `${workflowExecution.workflowId}-${workflowExecution.runId}-${activityId}`;
      // make http call to supplier and provide idempotencyToken so the Supplier is respecting
      // this value as something akin to purchase order number // using idempotency token
      const url = `${supplierURL}/${quantity}`;
      return await axios.get(url).then(response => {
        logger.info(response);
        return response.data;
      }); // Do not catch the error here, let it propagate
    },
  };
}
