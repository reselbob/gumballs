import winston from 'winston';

const LoggerWrapper = (): winston.Logger => {
  const {combine, timestamp, prettyPrint, splat} = winston.format;
  return winston.createLogger({
    level: 'info',
    format: combine(timestamp(), prettyPrint(), splat()),
    transports: [new winston.transports.Console()],
    exitOnError: false,
  });
};

export const logger = LoggerWrapper();
