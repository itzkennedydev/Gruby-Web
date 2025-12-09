import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BetaState {
  email: string;
  name: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const initialState: BetaState = {
  email: '',
  name: '',
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
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
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
      state.name = '';
      state.isSubmitting = false;
      state.isSubmitted = false;
      state.error = null;
    },
  },
});

export const { setEmail, setName, setSubmitting, setSubmitted, setError, resetBeta } = betaSlice.actions;
export default betaSlice.reducer;

