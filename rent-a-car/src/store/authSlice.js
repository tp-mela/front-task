import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';
const saved = localStorage.getItem('currentUser');
const initialUser = saved ? JSON.parse(saved) : null;
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const { data } = await api.get('/users');
    const user = data.find((u) => u.email === email);
    if (!user) throw new Error('Invalid credentials');
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: initialUser, status: 'idle', error: null },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: (b) => {
    b.addCase(loginUser.pending,  (s)    => { s.status = 'loading'; })
     .addCase(loginUser.fulfilled,(s,a)  => {
       s.status = 'succeeded';
       s.user   = a.payload;
       localStorage.setItem('currentUser', JSON.stringify(a.payload));
     })
     .addCase(loginUser.rejected, (s,a)  => {
       s.status = 'failed';
       s.error  = a.error.message;
     });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
