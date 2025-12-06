import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BetaState {
  email: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const initialState: BetaState = {
  email: '',
  isSubmitting: false,
  isSubmitted: false,
  error: null,
};

const betaSlice = createSlice({
  name: 'beta',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetBeta: (state) => {
      state.email = '';
      state.isSubmitting = false;
      state.isSubmitted = false;
      state.error = null;
    },
  },
});

export const { setEmail, setSubmitting, setSubmitted, setError, resetBeta } = betaSlice.actions;
export default betaSlice.reducer;

