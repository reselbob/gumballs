import { Connection, WorkflowClient } from '@temporalio/client';
import * as workflows from './workflows';
import { nanoid } from 'nanoid';

async function run() {
    const connection = await Connection.connect({
        // // Connect to localhost with default ConnectionOptions.
        // // In production, pass options to the Connection constructor to configure TLS and other settings:
        // address: 'foo.bar.tmprl.cloud', // as provisioned
        // tls: {} // as provisioned
    });

    const client = new WorkflowClient({
        connection,
        // namespace: 'default', // change if you have a different namespace
    });

    // Technitian installs gumball machine
    const { workflowId } = await client.start(workflows.gumballMachineWorkflow, {
        taskQueue: 'gumball',
        workflowId: 'gumball-machine-' + nanoid(),
    });

    // Dispense a gumball
    const requestId = nanoid();
    const handle = client.getHandle(workflowId);
    await handle.signal(workflows.dispenseGumballSignal, requestId);
    const gumball = await handle.query(workflows.dispenseGumballQuery, requestId);

    console.log('Got gumball', gumball);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
