import { Link } from 'react-router-dom';
import Button from './Button';


export default function UserListCard({ user }) {
  return (
    <li className="card">
      <p className="car-card__title">{user.name}</p>
      <p className="user-card__email">{user.email}</p>

      <Button as={Link} to={`/users/${user.id}`} variant="secondary">
        Details
      </Button>
    </li>
  );
}
