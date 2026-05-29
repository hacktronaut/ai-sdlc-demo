import { randomUUID } from "crypto";
import { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo";

export class TodoStore {
  private readonly todos = new Map<string, Todo>();

  list(): Todo[] {
    return Array.from(this.todos.values()).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  create(input: CreateTodoInput): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: randomUUID(),
      title: input.title,
      description: input.description,
      status: "pending",
      createdAt: now,
      updatedAt: now
    };

    this.todos.set(todo.id, todo);
    return todo;
  }

  getById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  update(id: string, input: UpdateTodoInput): Todo | undefined {
    const existing = this.todos.get(id);
    if (!existing) return undefined;

    const updated: Todo = {
      ...existing,
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      updatedAt: new Date().toISOString()
    };

    this.todos.set(id, updated);
    return updated;
  }

  clear(): void {
    this.todos.clear();
  }
}

export const todoStore = new TodoStore();
