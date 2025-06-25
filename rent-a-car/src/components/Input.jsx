export default function Input({ label, error, type='text', ...rest }) {
  return (
    <label className="block mb-4">
      <span className="block mb-1">{label}</span>
      <input
        type={type}
        className={`w-full border rounded px-3 py-2${error ? ' border-red-500' : ''}`}
        {...rest}
      />
      {error && <span style={{ color:'#ef4444', fontSize:14 }}>{error}</span>}
    </label>
  );
}
