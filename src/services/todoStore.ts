import { randomUUID } from "crypto";
import { CreateTodoInput, Todo } from "../types/todo";

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

  clear(): void {
    this.todos.clear();
  }
}

export const todoStore = new TodoStore();
