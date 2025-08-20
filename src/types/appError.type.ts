/**
 * Custom error class for application errors
 * @file appError.type.ts
 * @description This class extends the built-in Error class to create a custom error type for the application.
 * It includes properties for status code and operational status, allowing for better error handling and logging.
 * 
 * @author Arthur M. Artugue
 * @created 2025-08-17
 * @updated 2025-08-17
 */

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
    
    // Capture the stack trace for debugging purposes
    Error.captureStackTrace(this);
  }
}