import { useParams, useNavigate } from 'react-router-dom';
import AddCarForm from '../components/AddCarForm';
import Button     from '../components/Button';

export default function EditCarPage({ cars, users }) {
  const { carId } = useParams();
  const nav = useNavigate();

  const car = cars.find(c => c.id.toString() === carId);
  if (!car) return <p>Car not found</p>;

  return (
    <div>
      <Button variant="secondary" onClick={() => nav(-1)} className="btn-back">
        ← Back
      </Button>
      <h2 className="page-title">Edit car</h2>
      <AddCarForm initial={car} users={users} />
    </div>
  );
}
