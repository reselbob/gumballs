// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Runtime} from '@temporalio/worker';
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, prettyPrint, splat, printf} = format;

const myFormat = printf(info => {
  return `${info.timestamp}  ${info.level}: ${info.message}`;
});

const logger = createLogger({
  level: 'info',
  handleExceptions: true,
  format: combine(timestamp(), prettyPrint(), splat(), myFormat),
  transports: [new transports.Console()],
  exitOnError: false,
});

Runtime.install({logger});
