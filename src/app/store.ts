import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;git --version
