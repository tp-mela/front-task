import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsByUser } from '../store';

import UserCard from '../components/UserCard';
import CarList  from '../components/CarList';
import Button   from '../components/Button';

export default function UserProfilePage() {
  const { userId } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((s) =>
    s.users.list.find((u) => u.id.toString() === userId)
  );
  const userCars = useSelector((s) => s.cars.byUser[userId] || []);

  useEffect(() => {
    if (!userCars.length) dispatch(fetchCarsByUser(userId));
  }, [userId, userCars.length, dispatch]);

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <Button variant="secondary" onClick={() => nav(-1)} className="btn-back">
        ← Back
      </Button>

      <UserCard user={user} />

      <h4 className="section-title">Cars of {user.name}</h4>
      <CarList cars={userCars} compact />
    </div>
  );
}
