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

  it("gets todo by id", async () => {
    const createResponse = await request(app).post("/todos").send({ title: "Find one" });
    const id = createResponse.body.data.id as string;

    const response = await request(app).get(`/todos/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(id);
  });

  it("updates todo", async () => {
    const createResponse = await request(app).post("/todos").send({ title: "Before" });
    const id = createResponse.body.data.id as string;

    const updateResponse = await request(app)
      .put(`/todos/${id}`)
      .send({ title: "After", status: "done" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.title).toBe("After");
    expect(updateResponse.body.data.status).toBe("done");
  });

  it("deletes todo", async () => {
    const createResponse = await request(app).post("/todos").send({ title: "Delete me" });
    const id = createResponse.body.data.id as string;

    const deleteResponse = await request(app).delete(`/todos/${id}`);
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/todos/${id}`);
    expect(getResponse.status).toBe(404);
  });

  it("validates payloads", async () => {
    const createResponse = await request(app).post("/todos").send({ title: "" });
    expect(createResponse.status).toBe(400);
    expect(createResponse.body.error.code).toBe("INVALID_REQUEST");

    const updateResponse = await request(app).put("/todos/not-real").send({});
    expect(updateResponse.status).toBe(400);
  });
});
