import { register, login, logout } from './userSlice';  // adjust path if needed
import API from '../services/api';  // mock the API
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Create mock store with middleware
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock API
jest.mock('../services/api');
const mockedAPI = API as jest.Mocked<typeof API>;

// Initial test state
const initialState = {
  users: {
    loading: false,
    error: null,
    currentUser: null,
  },
};

describe('User Async Actions and Slice', () => {
  it('should handle user registration successfully', async () => {
    const mockUserResponse = { email: 'test@example.com', username: 'testuser', token: 'abc123' };

    // Mock the API call response for successful registration
    mockedAPI.post.mockResolvedValueOnce({ data: mockUserResponse });

    const store = mockStore(initialState);

    // Dispatch the `register` thunk
    await store.dispatch(register({ username: 'testuser', email: 'test@example.com', password: 'password' }));

    // Get the actions that were dispatched
    const actions = store.getActions();

    // Assert that the register.fulfilled action has been dispatched
    expect(actions[0].type).toBe(register.fulfilled.type);
    expect(actions[0].payload).toEqual(mockUserResponse);

    // Assert the final state after successful registration
    const expectedState = {
      users: {
        loading: false,
        error: null,
        currentUser: mockUserResponse,
      },
    };
    expect(store.getState()).toEqual(expectedState);
  });

  it('should handle user registration failure', async () => {
    // Mock an error response for registration failure
    mockedAPI.post.mockRejectedValueOnce({ response: { data: { message: 'Signup failed' } } });

    const store = mockStore(initialState);

    // Dispatch the `register` thunk
    await store.dispatch(register({ username: 'testuser', email: 'test@example.com', password: 'password' }));

    const actions = store.getActions();

    // Assert that the register.rejected action has been dispatched
    expect(actions[0].type).toBe(register.rejected.type);
    expect(actions[0].payload).toEqual({ message: 'Signup failed' });

    // Assert the state reflects the loading and error condition
    const expectedState = {
      users: {
        loading: false,
        error: { message: 'Signup failed' },
        currentUser: null,
      },
    };
    expect(store.getState()).toEqual(expectedState);
  });

  it('should handle user login successfully', async () => {
    const mockUserResponse = { email: 'test@example.com', username: 'testuser', token: 'abc123' };

    // Mock API response for successful login
    mockedAPI.post.mockResolvedValueOnce({ data: mockUserResponse });

    const store = mockStore(initialState);

    // Dispatch the `login` thunk
    await store.dispatch(login({ email: 'test@example.com', password: 'password' }));

    const actions = store.getActions();

    // Assert that login.fulfilled action was dispatched with correct data
    expect(actions[0].type).toBe(login.fulfilled.type);
    expect(actions[0].payload).toEqual(mockUserResponse);

    // Assert state has been updated with currentUser data
    const expectedState = {
      users: {
        loading: false,
        error: null,
        currentUser: mockUserResponse,
      },
    };
    expect(store.getState()).toEqual(expectedState);
  });

  it('should handle user login failure', async () => {
    // Mock a login error
    mockedAPI.post.mockRejectedValueOnce({ response: { data: { message: 'Login failed' } } });

    const store = mockStore(initialState);

    // Dispatch the `login` thunk
    await store.dispatch(login({ email: 'test@example.com', password: 'password' }));

    const actions = store.getActions();

    // Assert that login.rejected action was dispatched with correct error
    expect(actions[0].type).toBe(login.rejected.type);
    expect(actions[0].payload).toEqual({ message: 'Login failed' });

    // Assert the state reflects the loading and error condition
    const expectedState = {
      users: {
        loading: false,
        error: { message: 'Login failed' },
        currentUser: null,
      },
    };
    expect(store.getState()).toEqual(expectedState);
  });

  it('should handle logout action', () => {
    const store = mockStore({
      users: {
        loading: false,
        error: null,
        currentUser: { email: 'test@example.com', username: 'testuser', token: 'abc123' },
      },
    });

    // Dispatch logout action
    store.dispatch(logout());

    // Assert that state after logout reflects currentUser = null
    const expectedState = {
      users: {
        loading: false,
        error: null,
        currentUser: null,
      },
    };
    expect(store.getState()).toEqual(expectedState);
  });
});
