import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 10,
            filename: `${__dirname}/../logs/api.log`
        }),
        new transports.Console({
            level: 'debug',
            format: format.combine(format.simple())
        })
    ]
});

export default logger;