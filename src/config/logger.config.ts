import winston from 'winston';

const allowedTransports=[];

allowedTransports.push(new winston.transports.Console());

export default winston.createLogger({
    format:winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((log)=>`${log.timestamp} [${log.level}]:${log.message}`)
    ),
    transports:allowedTransports
});