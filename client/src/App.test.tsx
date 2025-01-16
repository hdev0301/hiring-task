import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router
import App from './App';  // Path to the main App component
import routes from './router/routes';  // Assuming routes are defined elsewhere

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

// Mocking ProtectedRoute and PublicRoute for testing
jest.mock('./router/ProtectedRoute', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('./router/PublicRoute', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

describe('App Routing', () => {

  it('should render the login page for unauthenticated users', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Test if Login route is rendered
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign-up/i)).toBeInTheDocument();
  });

  it('should render Todo page for authenticated users', async () => {
    // Set up the required mock for authentication context or mock the ProtectedRoute here

    render(
      <Router>
        <App />
      </Router>
    );

    // Assuming we mock out authentication, navigate to todo page (mock ProtectedRoute)
    fireEvent.click(screen.getByText(/todos/i));  // Assuming there's a link or button with "todos"
    await waitFor(() => screen.getByText(/todos page/i));

    // Confirm Todo Page rendered
    expect(screen.getByText(/todo page/i)).toBeInTheDocument();
  });

  it('should redirect to login when accessing an invalid route', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Navigate to an invalid route (wildcard route "*")
    window.history.pushState({}, 'Test Page', '/invalid-route');  // Setting up an invalid route
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('should render sign-up page when navigated to /sign-up route', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Navigate to sign-up route
    fireEvent.click(screen.getByText(/sign-up/i));
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('should render the TodoPage when user has access', async () => {
    // Mock necessary elements for a protected route

    render(
      <Router>
        <App />
      </Router>
    );

    // Navigate to a Todo route
    fireEvent.click(screen.getByText(/todos/i));
    await waitFor(() => screen.getByText(/todo page/i));

    // Check if TodoPage renders
    expect(screen.getByText(/todo page/i)).toBeInTheDocument();
  });
});
