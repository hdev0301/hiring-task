import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Todo type
export interface Todo {
    uuid: string;
    title: string;
    description?: string;
    status: boolean;
    dueDate?: Date;
}

// State type
interface TodoState {
    todos: Todo[];
}

// Initial State
const initialState: TodoState = {
    todos: [],
};

// Create Todo slice
export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.uuid !== action.payload);
        },
        updateStatus: (
            state,
            action: PayloadAction<{ uuid: string; status: boolean }>
        ) => {
            const todo = state.todos.find(todo => todo.uuid === action.payload.uuid)
            if (todo) {
                todo.status = action.payload.status;
            }
        },
    },
});

// Export actions and reducer
export const { addTodo, removeTodo, updateStatus } = todoSlice.actions;
export default todoSlice.reducer;
