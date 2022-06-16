import winston from 'winston';

const LoggerWrapper = (): winston.Logger => {
  const {combine, timestamp, printf, colorize} = winston.format;
  return winston.createLogger({
    level: 'info',
    format: combine(
      colorize(),
      timestamp(),
      printf(info => {
        return `${info.timestamp} [${info.level}] : ${JSON.stringify(
          info.message
        )}`;
      })
    ),
    transports: [new winston.transports.Console()],
    exitOnError: false,
  });
};

export const logger = LoggerWrapper();
