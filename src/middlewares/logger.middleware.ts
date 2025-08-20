import type { Request, Response, NextFunction } from 'express';
import { logger } from "../utils/logger.util.js";
import { env } from '../config/env.config.js';

/**
 * Custom logger middleware for Express applications.
 *
 * @file logger.middleware.ts
 * 
 * @description This middleware logs incoming requests and their details, including method,
 * URL, headers, and body (in development mode). It also logs the response status
 * and duration of the request processing.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 * 
 * @author Arthur M. Artugue
 * @created 2025-08-17
 * @updated 2025-08-20
 */
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) : void => {
  const startTime : number = Date.now();

  logger.info(`Incoming request`, {
    method: req.method,
    url: req.url,
    headers: env.NODE_ENV === "production" ? undefined : req.headers, // Avoid logging headers in production for security reasons
    body: env.NODE_ENV === "production" ? undefined : req.body, // Avoid logging body in production for security reasons
  });

  res.on("finish", () => {
    const duration : number = Date.now() - startTime;
    logger.info(`Response sent`, {
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
};
