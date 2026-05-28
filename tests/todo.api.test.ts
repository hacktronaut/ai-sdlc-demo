import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";
import { todoStore } from "../src/services/todoStore";

describe("Todo API", () => {
  beforeEach(() => {
    todoStore.clear();
  });

  it("returns health status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("creates and lists todos", async () => {
    const createResponse = await request(app)
      .post("/todos")
      .send({ title: "Write demo", description: "Create prompt walkthrough" });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.data.title).toBe("Write demo");
    expect(createResponse.body.data.status).toBe("pending");

    const listResponse = await request(app).get("/todos");
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data).toHaveLength(1);
  });

  it("validates payloads", async () => {
    const createResponse = await request(app).post("/todos").send({ title: "" });
    expect(createResponse.status).toBe(400);
    expect(createResponse.body.error.code).toBe("INVALID_REQUEST");
  });
});
