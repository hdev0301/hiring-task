import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../services/api';

// Todo type
export interface Todo {
  uuid: string;
  title: string;
  description?: string;
  status: boolean;
  dueDate?: string;
}

// State type
interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/todos');
      return response.data?.items;
    } catch (error: any) {
      return rejectWithValue(error.responose?.data || 'Failed to fetch todos');
    }
  });

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (newTodo: Partial<Todo>, { rejectWithValue }) => {
    try {
      const response = await API.post('/todos', newTodo);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create todo');
    }
  });

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async({ id, updatedTodo }: { id: string; updatedTodo: Partial<Todo> }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/todos/${id}`, updatedTodo);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update todo');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/todos/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete todo');
    }
  }
);

// Create Todo slice
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.todos = Array.isArray(payload) ? payload : [];
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.loading = false;
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        state.todos.push(payload);
        state.loading = false;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        state.todos = state.todos.map((todo: Todo) =>
          todo.uuid === payload.id ? { ...todo, ...payload } : todo
        );
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        state.todos = state.todos.filter((todo: Todo) => todo.uuid !== payload)
      });
  },
});

// Export actions and reducer
export default todoSlice.reducer;
