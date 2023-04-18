import { authSlice } from './secSlice';

export type RootState = {
  auth: ReturnType<typeof authSlice.reducer>;
  // Otros slices aquí
};
