import { createTodo, fetchTodos, deleteTodo, updateTodo } from './todoSlice';
import API from '../services/api';
import { Todo } from './todoSlice';  // adjust path as needed

jest.mock('../services/api');  // mock the axios service

describe('Todos async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // clears mocks between tests
  });

  it('should fetch todos successfully', async () => {
    const mockTodos: Todo[] = [
      { uuid: '1', title: 'Test Todo', description: 'Description', status: false, dueDate: '2025-01-01' },
    ];

    // Mock the resolved value of the `get` method to simulate a successful API call.
    (API.get as jest.Mock).mockResolvedValueOnce({ data: { items: mockTodos } });

    // Call the fetchTodos thunk and expect the result
    const dispatch = jest.fn();  // a mock dispatch function
    const fetchThunk = fetchTodos();
    await fetchThunk(dispatch);

    // Verifying whether the API.get was called and what data it returned
    expect(API.get).toHaveBeenCalledWith('/todos');
    expect(dispatch).toHaveBeenCalled();
    // You can further inspect how the store state gets updated here, e.g., ensuring a dispatched action.
  });

  it('should create a new todo', async () => {
    const newTodo: Partial<Todo> = { title: 'New Todo', description: 'New Description', status: false };

    // Simulate the mock response from creating a new todo
    (API.post as jest.Mock).mockResolvedValueOnce({ data: { ...newTodo, uuid: '2' } });

    // Define dispatch as a mock to simulate Redux dispatching.
    const dispatch = jest.fn();
    const createThunk = createTodo(newTodo);

    // Run the thunk
    await createThunk(dispatch);

    // Assert that API.post was called with correct URL and data
    expect(API.post).toHaveBeenCalledWith('/todos', newTodo);

    // Here you would also expect dispatch to have been called with the action to add the new todo.
    expect(dispatch).toHaveBeenCalled();
  });

  it('should update a todo status', async () => {
    const todo: Todo = { uuid: '1', title: 'Test Todo', description: 'Description', status: false, dueDate: '2025-01-01' };
    const updatedTodo = { ...todo, status: true };

    // Simulate the response when updating the todo.
    (API.put as jest.Mock).mockResolvedValueOnce({ data: updatedTodo });

    const dispatch = jest.fn();
    const updateThunk = updateTodo({ id: todo.uuid, updatedTodo: { status: true } });

    await updateThunk(dispatch);

    // Check if the correct API endpoint and body were passed
    expect(API.put).toHaveBeenCalledWith(`/todos/${todo.uuid}`, { status: true });
    expect(dispatch).toHaveBeenCalled();
  });

  it('should delete a todo', async () => {
    const todoId = '1';

    // Simulate a successful API response for deletion
    (API.delete as jest.Mock).mockResolvedValueOnce({});

    const dispatch = jest.fn();
    const deleteThunk = deleteTodo(todoId);

    await deleteThunk(dispatch);

    // Ensure delete was called with the right todo ID.
    expect(API.delete).toHaveBeenCalledWith(`/todos/${todoId}`);
    expect(dispatch).toHaveBeenCalled();
  });
});
