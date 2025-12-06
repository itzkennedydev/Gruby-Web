import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import betaReducer from './slices/betaSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    beta: betaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

