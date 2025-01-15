import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from '../features/todoSlice';
import userReducer from '../features/userSlice';

//Root state type definition
export type RootState = ReturnType<typeof rootReducer>;

// Persistence configuration
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
};

// Combine reducers and wrap them with `persistReducer`
const rootReducer = combineReducers({
  todos: todoReducer,
  users: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

// Types for dispatch and selector hooks
export type AppDispatch = typeof store.dispatch;

// Configure persistor
export const persistor = persistStore(store);
