import { configureStore } from '@reduxjs/toolkit';

import authReducer, {
  loginUser,
  logout,
} from './authSlice';
import usersReducer, {
  fetchUsers,
} from './usersSlice';

import carsReducer, {
  fetchCars,
  fetchCarsByUser,
  addCar,
  updateCar,
  deleteCar,
} from './carsSlice';
export const store = configureStore({
  reducer: {
    auth : authReducer,
    users: usersReducer,
    cars : carsReducer,
  },
});
export {
  loginUser,
  logout,
  fetchUsers,
  fetchCars,
  fetchCarsByUser,
  addCar,
  updateCar,
  deleteCar,
};
