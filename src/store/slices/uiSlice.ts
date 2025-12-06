import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  mobileMenuOpen: boolean;
  waitlistModalOpen: boolean;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  mobileMenuOpen: false,
  waitlistModalOpen: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setWaitlistModalOpen: (state, action: PayloadAction<boolean>) => {
      state.waitlistModalOpen = action.payload;
    },
  },
});

export const { setMobileMenuOpen, toggleMobileMenu, setTheme, setWaitlistModalOpen } = uiSlice.actions;
export default uiSlice.reducer;

