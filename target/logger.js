"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let winston = require('winston');
exports.default = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    })),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }),
    ],
});
//# sourceMappingURL=logger.js.map