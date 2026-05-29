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

  describe("GET /todos/:id", () => {
    it("returns a todo by id", async () => {
      const created = await request(app).post("/todos").send({ title: "Detail test" });
      const id = created.body.data.id;

      const response = await request(app).get(`/todos/${id}`);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(id);
      expect(response.body.data.title).toBe("Detail test");
    });

    it("returns TODO_NOT_FOUND for unknown id", async () => {
      const response = await request(app).get("/todos/nonexistent-id");
      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe("TODO_NOT_FOUND");
    });
  });

  describe("PUT /todos/:id", () => {
    it("updates a todo title and status", async () => {
      const created = await request(app).post("/todos").send({ title: "Original title" });
      const id = created.body.data.id;

      const response = await request(app)
        .put(`/todos/${id}`)
        .send({ title: "Updated title", status: "done" });

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(id);
      expect(response.body.data.title).toBe("Updated title");
      expect(response.body.data.status).toBe("done");
    });

    it("returns TODO_NOT_FOUND for unknown id", async () => {
      const response = await request(app)
        .put("/todos/nonexistent-id")
        .send({ title: "Will fail" });
      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe("TODO_NOT_FOUND");
    });

    it("rejects invalid update payload", async () => {
      const created = await request(app).post("/todos").send({ title: "Validate me" });
      const id = created.body.data.id;

      const response = await request(app)
        .put(`/todos/${id}`)
        .send({ status: "invalid-status" });
      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe("INVALID_REQUEST");
    });

    it("rejects update with empty title", async () => {
      const created = await request(app).post("/todos").send({ title: "Has title" });
      const id = created.body.data.id;

      const response = await request(app).put(`/todos/${id}`).send({ title: "" });
      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe("INVALID_REQUEST");
    });
  });
});
