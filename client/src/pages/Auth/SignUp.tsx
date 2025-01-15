import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../../app/store';
import { register } from '../../features/userSlice';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { loading, error } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    dispatch(register({ username: formData.username, email: formData.email, password: formData.password }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <Box component="form" noValidate>
      <TextField
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        margin="normal"
      />
      {error && (
        <Typography color="error">
          {error.message}
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="warning"
        onClick={(e: React.FormEvent) => handleLogin(e)}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default SignUp;
