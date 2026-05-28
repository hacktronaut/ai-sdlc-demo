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
