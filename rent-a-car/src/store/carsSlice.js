import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';
export const fetchCars = createAsyncThunk('cars/fetchAll', async () => {
  const { data } = await api.get('/cars');
  return data;
});

export const fetchCarsByUser = createAsyncThunk(
  'cars/fetchByUser',
  async (userId) => {
    const { data } = await api.get(`/users/${userId}/cars`);
    return { userId, data };
  }
);

export const addCar = createAsyncThunk('cars/add', async (car) => {
  const { data } = await api.post('/cars', car);
  return data;
});

export const updateCar = createAsyncThunk('cars/update', async (car) => {
  const { data } = await api.put(`/cars/${car.id}`, car);
  return data;
});

export const deleteCar = createAsyncThunk('cars/delete', async (id) => {
  await api.delete(`/cars/${id}`);
  return id;
});
const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    list: [],
    byUser: {},
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    const removeCarById = (state, id) => {
      const idStr = id.toString();
      state.list = state.list.filter((c) => c.id !== idStr);
      for (const arr of Object.values(state.byUser)) {
        const idx = arr.findIndex((c) => c.id === idStr);
        if (idx !== -1) arr.splice(idx, 1);
      }
    };
    builder
      .addCase(fetchCars.pending,  (s)    => { s.status = 'loading'; })
      .addCase(fetchCars.fulfilled,(s,a)  => { s.status = 'succeeded'; s.list = a.payload; })
      .addCase(fetchCars.rejected, (s,a)  => { s.status = 'failed';    s.error = a.error;  });
    builder.addCase(fetchCarsByUser.fulfilled, (s, a) => {
      s.byUser[a.payload.userId] = a.payload.data;
    });
    builder.addCase(addCar.fulfilled, (s, a) => {
      s.list.push(a.payload);
      const uid = a.payload.userId;
      if (s.byUser[uid]) s.byUser[uid].push(a.payload);
    });
    builder.addCase(updateCar.fulfilled, (s, a) => {
      const idx = s.list.findIndex((c) => c.id === a.payload.id);
      if (idx !== -1) s.list[idx] = a.payload;

      const uid = a.payload.userId;
      if (s.byUser[uid]) {
        const i2 = s.byUser[uid].findIndex((c) => c.id === a.payload.id);
        if (i2 !== -1) s.byUser[uid][i2] = a.payload;
      }
    });
    builder
      .addCase(deleteCar.fulfilled, (s, a) => {
        removeCarById(s, a.payload);
      })
      .addCase(deleteCar.rejected, (s, a) => {
        removeCarById(s, a.meta.arg);
      });
  },
});
export default carsSlice.reducer;
