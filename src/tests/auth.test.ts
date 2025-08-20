import request from "supertest";
import app from "../app.js";

/**
 * Authentication API Tests
 * This file contains tests for the authentication API endpoints.
 * It uses Supertest to make requests to the Express app and checks the responses.
 * @file auth.test.ts
 * @description Tests for authentication routes.
 * 
 * Usage:
 * - Run with `npm test` or `jest`.
 * - Tests cover login and health check endpoints.
 * 
 * @author Arthur M. Artugue
 * @created 2025-08-19
 * @updated 2025-08-19
 */

describe("Health Check", () => {
  it("should return status ok", async () => {
    const res = await request(app).get("/api/v1/auth/health")
    .set("origin", "https://production-domain.com");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

// describe("Auth Routes", () => {
//   it("should fail login with wrong credentials", async () => {
//     const res = await request(app)
//       .post("/api/v1/auth/login")
//       .set("origin", "https://production-domain.com")
//       .send({ email: "wrong@test.com", password: "wrong" });

//     expect(res.statusCode).toBe(401);
//   });
// });
