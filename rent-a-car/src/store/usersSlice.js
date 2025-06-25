import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await api.get('/users');
  return res.data;
});
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [], status: 'idle', error: null,
  },
  extraReducers: builder => builder
    .addCase(fetchUsers.pending,  s => { s.status = 'loading'; })
    .addCase(fetchUsers.fulfilled,(s, a) => { s.status = 'succeeded'; s.list = a.payload; })
    .addCase(fetchUsers.rejected, (s, a) => { s.status = 'failed';     s.error = a.error;  }),
});

export default usersSlice.reducer;
