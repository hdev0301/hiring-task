import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { login } from '../../features/userSlice';
import { RootState } from '../../app/store';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((state: RootState) => state.users);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for the field being edited
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const result = await dispatch(login(formData));
      if (login.fulfilled.match(result)) {
        navigate('/todos');
      }
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  const handleSignup = () => {
    navigate('/sign-up');
  };

  return (
    <Box component="form" noValidate>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error.message}
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="error"
        onClick={handleSignup}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        Signup

      </Button>
    </Box>
  )
};

export default Login;
