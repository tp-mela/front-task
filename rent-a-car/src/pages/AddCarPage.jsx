import AddCarForm from '../components/AddCarForm';
import Button     from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function AddCarPage({ users }) {
  const nav = useNavigate();
  return (
    <div>
      <Button variant="secondary" onClick={() => nav(-1)} className="btn-back">
        ← Back
      </Button>
      <h2 className="page-title">Add a new car</h2>
      <AddCarForm users={users} />
    </div>
  );
}
