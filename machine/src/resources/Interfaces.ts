// eslint-disable-next-line node/no-extraneous-import
import {Sinks} from '@temporalio/workflow';

export interface Gumball {
  color: string;
  flavor: string;
}

export interface LoggerSinks extends Sinks {
  logger: {
    info(message: string): void;
  };
}
