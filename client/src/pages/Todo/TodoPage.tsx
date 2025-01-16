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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when the user starts changing the input value
    if (errorMessage) setErrorMessage('');
  };

  const handleAddTodo = async () => {
    if (!newTodo.title) {
      setErrorMessage('Title is required.');
      return;
    }

    if (!newTodo.dueDate) {
      setErrorMessage('Due date is required.');
      return;
    }

    try {
      await dispatch(createTodo(newTodo));
      setNewTodo({ title: '', description: '', dueDate: '' });
      setErrorMessage('');
      await dispatch(fetchTodos());
    } catch (error) {
      console.error('Error adding todo:', error);
      setErrorMessage('Error adding todo');
    }
  };

  const handleToggleStatus = async (id: string, status: boolean) => {
    await dispatch(updateTodo({ id, updatedTodo: { status: !status } }));
    await dispatch(fetchTodos());
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTodo(id));
      window.location.reload();
    } catch (error) {
      console.error('Error deleting or fetching todos:', error);
      setErrorMessage('Error deleting todo');
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
          name="title"
          value={newTodo.title}
          onChange={handleChange}
          fullWidth
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <TextField
          label="Description"
          name="description"
          value={newTodo.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Due Date"
          type="date"
          name="dueDate"
          value={newTodo.dueDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errorMessage}
          helperText={errorMessage && !newTodo.dueDate ? 'Due date is required.' : ''}
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
