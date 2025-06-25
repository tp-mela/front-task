import { Link } from 'react-router-dom';
import CarCard    from './CarCard';
import EmptyState from './EmptyState';
import Button     from './Button';

export default function CarList({ cars, compact = false }) {
  if (!cars.length) {
    return (
      <EmptyState message="Nothing here yet">
        <Button as={Link} to="/cars/add">Add a car</Button>
      </EmptyState>
    );
  }

  return (
    <ul className={`list-grid ${compact ? '' : 'list-grid--twoCols'}`}>
      {cars.map(c => <CarCard key={c.id} car={c} compact={compact} />)}
    </ul>
  );
}
