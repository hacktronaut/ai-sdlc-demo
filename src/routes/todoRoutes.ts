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

function validateUpdatePayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return "Payload must be an object.";
  }

  const data = payload as Record<string, unknown>;

  if (data.title !== undefined) {
    if (typeof data.title !== "string" || !data.title.trim()) {
      return "Field 'title' must be a non-empty string when provided.";
    }
  }

  if (data.description !== undefined && typeof data.description !== "string") {
    return "Field 'description' must be a string when provided.";
  }

  if (data.status !== undefined && data.status !== "pending" && data.status !== "done") {
    return "Field 'status' must be 'pending' or 'done' when provided.";
  }

  return null;
}

function notFound(res: Response): Response {
  return res.status(404).json({
    error: {
      code: "TODO_NOT_FOUND",
      message: "Todo not found."
    }
  });
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
  if (!todo) return notFound(res);
  return res.status(200).json({ data: todo });
});

todoRouter.put("/:id", (req: Request, res: Response) => {
  const validationError = validateUpdatePayload(req.body);
  if (validationError) return badRequest(res, validationError);

  const existing = todoStore.getById(req.params.id);
  if (!existing) return notFound(res);

  const payload = req.body as { title?: string; description?: string; status?: "pending" | "done" };
  const updated = todoStore.update(req.params.id, {
    title: payload.title?.trim(),
    description: payload.description?.trim(),
    status: payload.status
  });

  return res.status(200).json({ data: updated });
});
