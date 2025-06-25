import UserList from '../components/UserList';

export default function UsersPage({ users }) {
  return (
    <>
      <h2 className="page-title">Users</h2>
      <UserList users={users} />
    </>
  );
}
