import type { CorsOptions } from "cors";
import { env } from "./env.config.js";

const allowedOrigins = [
  "https://production-domain.com",
];

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
 * @updated 2025-08-20
*/
export const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if(env.NODE_ENV === "development") {
      return callback(null, true); // Allow all origins in development
    } 
    
    if (!origin) {
      return callback(new Error("CORS error: No origin provided"), false);
    }
    
    if (allowedOrigins.includes(origin)) {
      // Allow listed origins
      callback(null, true);
    } else {
      // Reject without crashing app
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET","POST"],
  credentials: true,
  optionsSuccessStatus: 204,
};

