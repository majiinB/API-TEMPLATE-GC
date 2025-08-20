import winston from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
import { env } from '../config/env.config.js';

// Initialize Google Cloud Logging transport for production
const loggingWinston : LoggingWinston = new LoggingWinston();

/**
 * Logger utility for the Heron Wellnest Authentication API.
 *
 * This module sets up a Winston logger with different transports based on the environment.
 * In production, it uses Google Cloud Logging; in development, it logs to the console.
 *
 * @file logger.util.ts
 * @description Configures the Winston logger for the application.
 *
 * @author Arthur M. Artugue
 * @created 2025-08-17
 * @updated 2025-08-17
 */
export const logger : winston.Logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    env.NODE_ENV === "production"
      ? winston.format.json() 
      : winston.format.combine(
          winston.format.colorize(), 
          winston.format.simple()
        )
  ),
  transports: [
    new winston.transports.Console(),
    ...(env.NODE_ENV === "production" ? [loggingWinston] : [])
  ]
});

