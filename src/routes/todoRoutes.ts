import { Request, Response, Router } from "express";
import { todoStore } from "../services/todoStore";
import { TodoStatus } from "../types/todo";

export const todoRouter = Router();

function isTodoStatus(value: unknown): value is TodoStatus {
  return value === "pending" || value === "done";
}

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

function validateUpdatePayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return "Payload must be an object.";
  }

  const data = payload as Record<string, unknown>;
  const hasAnyField = data.title !== undefined || data.description !== undefined || data.status !== undefined;

  if (!hasAnyField) {
    return "At least one of 'title', 'description', or 'status' must be provided.";
  }

  if (data.title !== undefined && (typeof data.title !== "string" || !data.title.trim())) {
    return "Field 'title' must be a non-empty string when provided.";
  }

  if (data.description !== undefined && typeof data.description !== "string") {
    return "Field 'description' must be a string when provided.";
  }

  if (data.status !== undefined && !isTodoStatus(data.status)) {
    return "Field 'status' must be either 'pending' or 'done'.";
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

todoRouter.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    data: todoStore.list()
  });
});

todoRouter.get("/:id", (req: Request, res: Response) => {
  const todo = todoStore.getById(req.params.id);
  if (!todo) {
    return res.status(404).json({
      error: {
        code: "TODO_NOT_FOUND",
        message: `Todo '${req.params.id}' was not found.`
      }
    });
  }

  return res.status(200).json({ data: todo });
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

todoRouter.put("/:id", (req: Request, res: Response) => {
  const validationError = validateUpdatePayload(req.body);
  if (validationError) {
    return badRequest(res, validationError);
  }

  const existing = todoStore.getById(req.params.id);
  if (!existing) {
    return res.status(404).json({
      error: {
        code: "TODO_NOT_FOUND",
        message: `Todo '${req.params.id}' was not found.`
      }
    });
  }

  const payload = req.body as { title?: string; description?: string; status?: TodoStatus };
  const todo = todoStore.update(req.params.id, {
    title: payload.title?.trim(),
    description: payload.description?.trim(),
    status: payload.status
  });

  return res.status(200).json({ data: todo });
});

todoRouter.delete("/:id", (req: Request, res: Response) => {
  const deleted = todoStore.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({
      error: {
        code: "TODO_NOT_FOUND",
        message: `Todo '${req.params.id}' was not found.`
      }
    });
  }

  return res.status(204).send();
});
