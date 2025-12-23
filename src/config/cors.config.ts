import type { CorsOptions } from "cors";
import { env } from "./env.config.js";

const staticAllowlist = [
  "https://production-domain.com",
];

// // Parse comma-separated env list (exact origin strings)
// const envAllowlist = (env.CORS_ALLOWED_ORIGINS ?? "")
//   .split(",")
//   .map(s => s.trim())
//   .filter(Boolean);

const allowlist = new Set<string>([...staticAllowlist]);

function isLocalhostOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    const hn = url.hostname;
    // Allow localhost, 127.0.0.1, ::1, and *.local (any port)
    return hn === "localhost" || hn === "127.0.0.1" || hn === "::1" || hn.endsWith(".local");
  } catch {
    return false;
  }
}

/**
 * CORS configuration options for the API.
 * This configuration allows requests from specific origins and
 * restricts methods to GET and POST. It also supports credentials and
 * returns a success status of 204 for preflight requests.
 * @file cors.config.ts
 * @description Configures CORS for the application.
 * 
 * Usage:
 * - Imported in `app.ts` to apply CORS middleware.
 * - Allows requests from specified origins only.
 * - Restricts methods to GET and POST.
 *  
 * @author Arthur M. Artugue
 * @created 2025-08-17
 * @updated 2025-12-23
*/
export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    // Allow server-to-server and tools (no Origin header)
    if (!origin) return callback(null, true);

    // In development, reflect any Origin (works with credentials: true)
    if (env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    // In production, allow listed origins only
    if (allowlist.has(origin)) {
      return callback(null, true);
    }

    // Optionally allow localhost to hit prod (comment out if you don’t want this)
    if (isLocalhostOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true, // Sends Access-Control-Allow-Credentials: true
  optionsSuccessStatus: 204,
};

