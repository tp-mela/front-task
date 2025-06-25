import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCar } from '../store';
import Button from './Button';


export default function CarCard({ car, compact = false }) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onDelete = async () => {
    if (!window.confirm('Delete this car?')) return;
    try {
      await dispatch(deleteCar(car.id)).unwrap();
      if (window.location.pathname.startsWith('/cars/') && !compact) nav('/cars');
    } catch (e) {
      console.warn('Delete failed:', e.message);
    }
  };

  return (
    <li className={`card ${compact ? 'card--compact' : ''}`}>
      <div>
        <p className="car-card__title">
          {car.brand} {car.model}
          {car.isNew && <span style={{fontSize:12,marginLeft:6,color:'#10b981'}}>(new)</span>}
        </p>
        <p className="car-card__owner">Owner ID: {car.userId}</p>
        <ul style={{fontSize:14,margin:'8px 0',color:'#4b5563'}}>
          <li>Manufacturer: <strong>{car.manufacturer}</strong></li>
          <li>Color:        <strong>{car.color}</strong></li>
          <li>Price:        <strong>${car.price}</strong></li>
          <li>VIN:          <strong>{car.vin}</strong></li>
          <li>Created at:   {new Date(car.createdAt).toLocaleDateString()}</li>
        </ul>
      </div>

      {!compact && (
        <div className="car-card__actions">
          <Button as={Link} to={`/cars/${car.id}`} variant="secondary">Details</Button>
          <Button as={Link} to={`/cars/${car.id}/edit`} variant="secondary">Edit</Button>
          <Button variant="danger" onClick={onDelete}>Delete</Button>
        </div>
      )}
    </li>
  );
}
