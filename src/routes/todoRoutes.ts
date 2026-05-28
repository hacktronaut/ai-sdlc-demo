import { Request, Response, Router } from "express";
import { todoStore } from "../services/todoStore";

export const todoRouter = Router();

function validateCreatePayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return "Payload must be an object.";
  }

  const data = payload as Record<string, unknown>;
  if (!data.title || typeof data.title !== "string" || !data.title.trim()) {
    return "Field 'title' is required and must be a non-empty string.";
  }

  if (data.description !== undefined && typeof data.description !== "string") {
    return "Field 'description' must be a string when provided.";
  }

  return null;
}

function badRequest(res: Response, message: string): Response {
  return res.status(400).json({
    error: {
      code: "INVALID_REQUEST",
      message
    }
  });
}

function todoNotFound(res: Response, id: string): Response {
  return res.status(404).json({
    error: {
      code: "TODO_NOT_FOUND",
      message: `Todo with id '${id}' was not found.`
    }
  });
}

function validateUpdatePayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return "Payload must be an object.";
  }

  const data = payload as Record<string, unknown>;
  const allowedKeys = new Set(["title", "description", "status"]);

  const keys = Object.keys(data);
  if (keys.length === 0) {
    return "At least one of 'title', 'description', or 'status' is required.";
  }

  const unknownKeys = keys.filter((key) => !allowedKeys.has(key));
  if (unknownKeys.length > 0) {
    return `Unknown fields: ${unknownKeys.join(", ")}.`;
  }

  if ("title" in data) {
    if (typeof data.title !== "string" || !data.title.trim()) {
      return "Field 'title' must be a non-empty string when provided.";
    }
  }

  if ("description" in data) {
    if (typeof data.description !== "string") {
      return "Field 'description' must be a string when provided.";
    }
  }

  if ("status" in data) {
    if (data.status !== "pending" && data.status !== "done") {
      return "Field 'status' must be either 'pending' or 'done' when provided.";
    }
  }

  return null;
}

todoRouter.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    data: todoStore.list()
  });
});

todoRouter.post("/", (req: Request, res: Response) => {
  const validationError = validateCreatePayload(req.body);
  if (validationError) {
    return badRequest(res, validationError);
  }

  const payload = req.body as { title: string; description?: string };
  const todo = todoStore.create({
    title: payload.title.trim(),
    description: payload.description?.trim() || undefined
  });

  return res.status(201).json({ data: todo });
});

todoRouter.get("/:id", (req: Request, res: Response) => {
  const todo = todoStore.getById(req.params.id);
  if (!todo) {
    return todoNotFound(res, req.params.id);
  }

  return res.status(200).json({ data: todo });
});

todoRouter.put("/:id", (req: Request, res: Response) => {
  const validationError = validateUpdatePayload(req.body);
  if (validationError) {
    return badRequest(res, validationError);
  }

  const data = req.body as { title?: string; description?: string; status?: "pending" | "done" };
  const updatedTodo = todoStore.update(req.params.id, {
    title: data.title?.trim(),
    description: data.description?.trim(),
    status: data.status
  });

  if (!updatedTodo) {
    return todoNotFound(res, req.params.id);
  }

  return res.status(200).json({ data: updatedTodo });
});
