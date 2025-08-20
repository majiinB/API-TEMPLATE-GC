import type { Request, Response, NextFunction } from "express";
import { AppError } from "../types/appError.type.js";
import { env } from "../config/env.config.js";
import { logger } from "../utils/logger.util.js";

/**
 * Error handling middleware for Express applications.
 *
 * @file error.middleware.ts
 * @description This middleware captures errors thrown in the application and formats
 * them into a consistent JSON response. It distinguishes between custom
 * application errors (AppError) and generic errors, providing appropriate
 * status codes and messages.
 *
 * @param err - The error object, which can be an instance of AppError or a generic Error.
 * @param _req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * @example
 * // Example usage in an Express app:
 * app.use(errorMiddleware);
 * 
 * @author Arthur M. Artugue
 * @created 2025-08-20
 * @updated 2025-08-20
 */
export function errorMiddleware(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error("Error occurred", {
    message: err.message,
    stack: env.NODE_ENV === "development" ? err.stack : undefined, // Log stack trace only in development
  });

  // If it's an AppError, use its statusCode, otherwise fallback to 500
  const statusCode : number = err instanceof AppError ? err.statusCode : 500;

  const message : string = err instanceof AppError ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}