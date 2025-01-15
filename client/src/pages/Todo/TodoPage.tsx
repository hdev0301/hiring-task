import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { AppDispatch, RootState } from '../../app/store';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../features/todoSlice';

const TodoPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.title) {
      await dispatch(createTodo(newTodo));
      setNewTodo({ title: '', description: '', dueDate: '' });
      await dispatch(fetchTodos());
    }
  };

  const handleToggleStatus = async (id: string, status: boolean) => {
    await dispatch(updateTodo({ id, updatedTodo: { status: !status } }));
    await dispatch(fetchTodos());
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTodo(id)).unwrap(); // Ensure action resolves or throws an error
      await dispatch(fetchTodos()).unwrap();  // Re-fetch todos to refresh the state
    } catch (error) {
      console.error('Error deleting or fetching todos:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" marginBottom={2}>
        Todo List
      </Typography>

      <Box marginBottom={4}>
        <TextField
          label="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          fullWidth
        />
        <TextField
          label="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Due Date"
          type="date"
          value={newTodo.dueDate}
          onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Add Todo
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          {Array.isArray(todos) &&
            todos.map((todo) => (
              <Grid item key={todo.uuid} xs={12} sm={6} md={4}>
                <Box padding={2} border="1px solid gray" borderRadius={2}>
                  <Typography variant="h6">{todo.title}</Typography>
                  <Typography>{todo.description}</Typography>
                  <Typography color="textSecondary">
                    Due: {todo.dueDate || 'No due date'}
                  </Typography>
                  <Checkbox
                    checked={todo.status}
                    onChange={() => handleToggleStatus(todo.uuid, todo.status)}
                  />
                  <Button color="error" onClick={() => handleDelete(todo.uuid)}>
                    Delete
                  </Button>
                </Box>
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default TodoPage;
