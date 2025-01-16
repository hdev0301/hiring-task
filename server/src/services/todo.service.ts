import { TodoEntity } from "../entities";
import { AppDataSource } from "../db";

/**
 * Create Todo
 * @param data { title, description, status, dueDate } 
 * @returns new todo item
 */
export const createTodo = async (data) => {
  const { title, description, status, dueDate, user } = data;
  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const newTodo = new TodoEntity();
  newTodo.title = title;
  newTodo.description = description;
  newTodo.status = status;
  newTodo.dueDate = dueDate;
  newTodo.user = user;
  await todoRepository.save(newTodo);
  return newTodo;
};

/**
 * Get All Todos
 * @returns all todo items
 */
export const getTodos = async (user) => {
  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const todos = await todoRepository.find({
    where: { user: { uuid: user.uuid }}
  });
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
  const { uuid, title, description, status, dueDate, user } = data;

  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const todo = await todoRepository.findOne({
    where: { uuid: uuid, user: { uuid: user.uuid }},
  });

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
  const { uuid, user } = data;

  const todoRepository = AppDataSource.getRepository(TodoEntity);
  const todo = await todoRepository.findOne({
    where: { uuid: uuid, user: { uuid: user.uuid } },
  });

  if (!todo) return null;

  await todoRepository.remove(todo);
};
