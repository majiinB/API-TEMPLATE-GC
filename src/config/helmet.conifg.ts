import type { HelmetOptions } from "helmet";

/**
 * Helmet configuration for the API.
 *
 * This configuration sets up security headers to protect the application
 * from common vulnerabilities. It disables the Content Security Policy
 * for flexibility in development and testing environments.
 *
 * @file helmet.config.ts
 * @author Arthur M. Artugue
 * @created 2025-08-18
 * @updated 2025-08-20
 */
export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: false,
}