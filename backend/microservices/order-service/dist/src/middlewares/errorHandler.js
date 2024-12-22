"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../config/logger");
const errorHandler = (err, req, res, next) => {
    const errorLocation = (0, logger_1.getCallerLocation)();
    logger_1.logger.error(err.message, {
        stack: err.stack,
        request: {
            method: req.method,
            url: req.url,
        },
        location: errorLocation,
    });
    res.status(500).json({
        message: "Something went wrong, please try again later.",
    });
};
exports.default = errorHandler;
