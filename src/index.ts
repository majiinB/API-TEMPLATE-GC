/**
 * <Your-API-Service-Name> API
 *
 * @file index.ts
 * @description Main entry point for the API. 
 * Imports the configured Express application from `app.js` and starts the 
 * server on the specified port.
 *
 * Server:
 * - Loads the Express app from `app.js`.
 * - Listens on port 8080 (or the port defined in environment variables).
 *
 * Deployment / Execution:
 * - Docker: `docker run -p 8080:8080 <your-region>-docker.pkg.dev/<your-project-id>/<your-repo>/<your-service-name>:latest`
 * - Local: `npm run dev` or `npm run start`
 *
 * The server remains running and listens for incoming HTTP requests.
 *
 * @author Arthur M. Artugue
 * @created 2025-08-14
 * @updated 2025-08-20
 */

import app from './app.js'
import { env } from './config/env.config.js';

const PORT = env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
