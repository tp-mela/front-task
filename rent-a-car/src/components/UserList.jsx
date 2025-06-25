import UserListCard from './UserListCard';
import EmptyState   from './EmptyState';

export default function UserList({ users }) {
  if (!users.length) return <EmptyState message="Nothing here yet" />;

  return (
    <ul className="list-grid list-grid--twoCols">
      {users.map(u => <UserListCard key={u.id} user={u} />)}
    </ul>
  );
}
