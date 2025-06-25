import CarList from '../components/CarList';
import Button  from '../components/Button';
import { Link } from 'react-router-dom';

export default function CarsPage({ cars }) {
  return (
    <>
      <div className="flex-between">
        <h2 className="page-title">Cars</h2>
        <Button as={Link} to="/cars/add">+ Add car</Button>
      </div>
      <CarList cars={cars} />
    </>
  );
}
