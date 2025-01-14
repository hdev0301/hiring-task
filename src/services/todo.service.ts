import { TodoEntity } from "../entities";
import { AppDataSource } from "../db";

/**
 * Create Todo
 * @param data { title, description, status, dueDate } 
 * @returns new todo item
 */
export const createTodo = async (data) => {
  const { title, description, status, dueDate } = data;
  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const newTodo = todoRepository.create({ title, description, status, dueDate });
  await todoRepository.save(newTodo);
  return newTodo;
};

/**
 * Get All Todos
 * @returns all todo items
 */
export const getTodos = async () => {
  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const todos = await todoRepository.find();
  return todos || [];
};


/**
 * Get Todo Item by UUID
 * @param data { uuid }
 * @returns the todo item found by uuid
 */
export const getTodoById = async (data) => {
  const { uuid } = data;

  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const todo = await todoRepository.findOneBy({ uuid });

  if (!todo) return null;

  return todo;
};

/**
 * Update Todo Item by UUID
 * @param data { title, description, status, dueDate }
 * @returns the updated todo item
 */
export const updateTodo = async (data) => {
  const { uuid } = data;
  const { title, description, status, dueDate } = data;

  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const todo = await todoRepository.findOneBy({ uuid });

  if (!todo) return null;

  todo.title = title ?? todo.title;
  todo.description = description ?? todo.description;
  todo.status = status ?? todo.status;
  todo.dueDate = dueDate ?? todo.dueDate;
  await todoRepository.save(todo);

  return todo;
};

/**
 * Delete Todo Item by UUID
 * @param data { uuid }
 * @returns the removed todo item
 */
export const deleteTodo = async (data) => {
  const { uuid } = data;

  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const todo = await todoRepository.findOneBy({ uuid });

  if (!todo) return null;

  await todoRepository.remove(todo);
};
