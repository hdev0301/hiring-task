import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import TodoLayout from './layouts/TodoLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import TodoPage from './pages/Todo/TodoPage';
import routes from './router/routes';
import ProtectedRoute from './router/ProtectedRoute';
import PublicRoute from './router/PublicRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Route>

        {/* Todo Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<TodoLayout />}>
            <Route path={routes.todos} element={<TodoPage />} />
          </Route>
        </Route>

        {/* Redirect invalid routes to login */}
        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </Router>
  );
};


export default App;
