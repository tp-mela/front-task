export default function EmptyState({ message, children = null }) {
  return (
    <div className="empty">
      <p className="empty__text">{message}</p>
      {children}
    </div>
  );
}
