import winston from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, align, errors } = winston.format;

// Helper to extract the caller location
export const getCallerLocation = () => {
  const stack = new Error().stack || "";
  const stackLines = stack.split("\n");

  // Skip the first two lines (Error and current function)
  const callerLine = stackLines[3]; // Adjust the index based on where this function is called
  if (callerLine) {
    // Extract the file, method, and line number
    const match = callerLine.match(/\((.*):(\d+):(\d+)\)/);
    if (match) {
      const [_, filePath, line, column] = match;
      const fileName = path.basename(filePath);
      return `${fileName}:${line}:${column}`;
    }
  }
  return "Unknown location";
};

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    errors({ stack: true }),
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => {
      const errorLocation = info.location || "Unknown location"; // Use the error location passed from middleware
      return `[Error Time: ${info.timestamp}], [Error Level: ${info.level}], [Error Message: ${info.message}], [Error Location: ${errorLocation}]`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/app-error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "app-info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "combined.log",
    }),
  ],
});

// Add a wrapper around logger methods to inject the caller location
["info", "error"].forEach((level) => {
  const originalMethod = (logger as any)[level];
  (logger as any)[level] = (...args: any[]) => {
    const location = getCallerLocation();
    originalMethod.call(logger, ...args, { location });
  };
});
