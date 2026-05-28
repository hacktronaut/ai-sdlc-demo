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

  it("returns TODO_NOT_FOUND when fetching an unknown todo", async () => {
    const detailResponse = await request(app).get("/todos/missing-id");

    expect(detailResponse.status).toBe(404);
    expect(detailResponse.body.error.code).toBe("TODO_NOT_FOUND");
  });

  it("updates a todo", async () => {
    const createResponse = await request(app)
      .post("/todos")
      .send({ title: "Write demo", description: "Create prompt walkthrough" });

    const todoId = createResponse.body.data.id as string;

    const updateResponse = await request(app)
      .put(`/todos/${todoId}`)
      .send({ title: "Update demo", description: "Updated description", status: "done" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.id).toBe(todoId);
    expect(updateResponse.body.data.title).toBe("Update demo");
    expect(updateResponse.body.data.description).toBe("Updated description");
    expect(updateResponse.body.data.status).toBe("done");

    const detailResponse = await request(app).get(`/todos/${todoId}`);
    expect(detailResponse.status).toBe(200);
    expect(detailResponse.body.data.title).toBe("Update demo");
    expect(detailResponse.body.data.status).toBe("done");
  });

  it("returns TODO_NOT_FOUND when updating an unknown todo", async () => {
    const updateResponse = await request(app).put("/todos/missing-id").send({ status: "done" });

    expect(updateResponse.status).toBe(404);
    expect(updateResponse.body.error.code).toBe("TODO_NOT_FOUND");
  });

  it("validates update payloads", async () => {
    const createResponse = await request(app).post("/todos").send({ title: "Write demo" });
    const todoId = createResponse.body.data.id as string;

    const emptyPayloadResponse = await request(app).put(`/todos/${todoId}`).send({});
    expect(emptyPayloadResponse.status).toBe(400);
    expect(emptyPayloadResponse.body.error.code).toBe("INVALID_REQUEST");

    const invalidStatusResponse = await request(app).put(`/todos/${todoId}`).send({ status: "in-progress" });
    expect(invalidStatusResponse.status).toBe(400);
    expect(invalidStatusResponse.body.error.code).toBe("INVALID_REQUEST");
  });
});
