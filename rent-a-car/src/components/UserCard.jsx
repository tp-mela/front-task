export default function UserCard({ user }) {
  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <h3 className="car-card__title">{user.name}</h3>
      <p className="user-card__email">Email: {user.email}</p>
      <p className="user-card__id">ID: {user.id}</p>
    </div>
  );
}
