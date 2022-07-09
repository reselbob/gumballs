import * as activity from '@temporalio/activity';
import { Gumball } from './workflow';

export async function buyGumballs(): Promise<Gumball[]> {
    const { workflowExecution, activityId } = activity.Context.current().info;
    const idempotencyToken = `${workflowExecution.workflowId}-${workflowExecution.runId}-${activityId}`;
    // make http call to supplier and provide idempotencyToken so the Supplier is respecting
    // this value as something akin to purchase order number // using idempotency token
    return [{ color: 'blue', flavor: 'blueberry' }];
}