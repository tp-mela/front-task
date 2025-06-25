import { useParams, useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import Button  from '../components/Button';

export default function CarDetailsPage({ cars }) {
  const { carId } = useParams();
  const nav = useNavigate();

  const car = cars.find(c => c.id.toString() === carId);
  if (!car) return <p>Car not found</p>;

  return (
    <div>
      <Button variant="secondary" onClick={() => nav(-1)} className="mb-4">← Back</Button>
      <ul><CarCard car={car} /></ul>
    </div>
  );
}
