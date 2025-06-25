import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header            from './components/Header';
import LoginPage         from './pages/LoginPage';
import UsersPage         from './pages/UsersPage';
import UserProfilePage   from './pages/UserProfilePage';
import CarsPage          from './pages/CarsPage';
import CarDetailsPage    from './pages/CarDetailsPage';
import AddCarPage        from './pages/AddCarPage';
import EditCarPage       from './pages/EditCarPage';

import {
  fetchUsers,
  fetchCars,
} from './store';

export default function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth);

  const {
    list: users,
    status: usersStatus,
    error : usersError,
  } = useSelector((s) => s.users);

  const {
    list: cars,
    status: carsStatus,
    error : carsError,
  } = useSelector((s) => s.cars);
  useEffect(() => {
    if (user && usersStatus === 'idle') dispatch(fetchUsers());
    if (user && carsStatus  === 'idle') dispatch(fetchCars());
  }, [user, usersStatus, carsStatus, dispatch]);
  if (user && (usersStatus === 'loading' || carsStatus === 'loading')) {
    return <p style={{ padding: 24, textAlign: 'center' }}>Loading…</p>;
  }

  if (user && (usersError || carsError)) {
    return (
      <p style={{ padding: 24, textAlign: 'center', color: '#ef4444' }}>
        {usersError || carsError}
      </p>
    );
  }
  return (
    <>
      <Header />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              user ? (
                <Routes>
                  <Route path="/"              element={<Navigate to="/users" replace />} />
                  <Route path="/users"         element={<UsersPage users={users} />} />
                  <Route path="/users/:userId" element={<UserProfilePage />} />

                  <Route path="/cars"          element={<CarsPage cars={cars} />} />
                  <Route path="/cars/:carId"   element={<CarDetailsPage cars={cars} />} />
                  <Route path="/cars/:carId/edit"
                           element={<EditCarPage cars={cars} users={users} />} />
                  <Route path="/cars/add"      element={<AddCarPage users={users} />} />

                  <Route path="*" element={<p style={{ textAlign:'center' }}>Page not found</p>} />
                </Routes>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>
    </>
  );
}
