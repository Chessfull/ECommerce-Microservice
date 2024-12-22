"use strict";
// **************** My Global Error Handling Settings ****************
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.getCallerLocation = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, printf, colorize, align, errors } = winston_1.default.format;
// -> Helper to extract the caller location
const getCallerLocation = () => {
    const stack = new Error().stack || "";
    const stackLines = stack.split("\n");
    // -> For Error Location
    const callerLine = stackLines[3];
    if (callerLine) {
        const match = callerLine.match(/\((.*):(\d+):(\d+)\)/);
        if (match) {
            const [_, filePath, line, column] = match;
            const fileName = path_1.default.basename(filePath);
            return `${fileName}:${line}:${column}`;
        }
    }
    return "Unknown location";
};
exports.getCallerLocation = getCallerLocation;
exports.logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: combine(errors({ stack: true }), colorize({ all: true }), timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }), align(), printf((info) => {
        const errorLocation = info.location || "Unknown location"; // -> Use the error location passed from middleware
        return `[Error Time: ${info.timestamp}], [Error Level: ${info.level}], [Error Message: ${info.message}], [Error Location: ${errorLocation}]`;
    })),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: "logs/app-error.log",
            level: "error",
        }),
        new winston_1.default.transports.File({
            filename: "app-info.log",
            level: "info",
        }),
        new winston_1.default.transports.File({
            filename: "combined.log",
        }),
    ],
});
["info", "error"].forEach((level) => {
    const originalMethod = exports.logger[level];
    exports.logger[level] = (...args) => {
        const location = (0, exports.getCallerLocation)();
        originalMethod.call(exports.logger, ...args, { location });
    };
});
//# sourceMappingURL=logger.js.map