import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCar, updateCar } from '../store';
import Input  from './Input';
import Button from './Button';


const EMPTY = {
  brand: '',
  model: '',
  userId: '',
  manufacturer: '',
  color: '',
  price: '',
  vin: '',
  isNew: false,
};

export default function AddCarForm({ initial = EMPTY, users = [] }) {
  const isEdit = Boolean(initial.id);
  const [values, setValues] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});
  const nav = useNavigate();
  const dispatch = useDispatch();

  const validate = (v) => {
    const e = {};
    if (!v.brand.trim())  e.brand  = 'Brand is required';
    if (!v.model.trim())  e.model  = 'Model is required';
    if (!v.userId.trim()) e.userId = 'Owner ID is required';
    if (v.price && isNaN(Number(v.price))) e.price = 'Price must be a number';
    return e;
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      if (isEdit) {
        await dispatch(updateCar(values)).unwrap();
      } else {
        await dispatch(addCar(values)).unwrap();
      }
      nav('/cars');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <Input label="Brand"  name="brand"  value={values.brand}  onChange={handleChange} error={errors.brand} />
      <Input label="Model"  name="model"  value={values.model}  onChange={handleChange} error={errors.model} />
      <Input label="Manufacturer" name="manufacturer" value={values.manufacturer} onChange={handleChange} />
      <Input label="Color"        name="color"        value={values.color}        onChange={handleChange} />
      <Input label="Price ($)"    name="price"        value={values.price}        onChange={handleChange} error={errors.price} />
      <Input label="VIN"          name="vin"          value={values.vin}          onChange={handleChange} />


      <label className="block mb-4">
        <input
          type="checkbox"
          name="isNew"
          checked={values.isNew}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        Is new
      </label>

      {users.length > 0 && (
        <label className="block mb-4">
          <span className="block mb-1">Owner (user)</span>
          <select
            className="w-full border rounded px-3 py-2"
            name="userId"
            value={values.userId}
            onChange={handleChange}
          >
            <option value="">-- select --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          {errors.userId && (
            <span style={{ color: '#ef4444', fontSize: 14 }}>{errors.userId}</span>
          )}
        </label>
      )}

      <Button type="submit">{isEdit ? 'Save changes' : 'Add car'}</Button>
    </form>
  );
}
