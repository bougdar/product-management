import { useState, useEffect } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productService';

const categories = ['Clothes', 'Accessory', 'Glasses'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Clothes',
    quantity: 0,
    price: 0,
    place: ''
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== undefined) {
        fd.append(key, form[key]);
      }
    });

    if (editing) {
      await updateProduct(editing, fd);
      setEditing(null);
    } else {
      await createProduct(fd);
    }

    setForm({
      name: '',
      description: '',
      category: 'Clothes',
      quantity: 0,
      price: 0,
      place: '',
      image: null
    });
    setShowForm(false);
    fetchProducts();
  };


  const handleEdit = product => {
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
      place: product.place
    });
    setEditing(product._id);
    setShowForm(true);
  };

  const handleDelete = async id => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Products</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Product'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }} encType="multipart/form-data">
          {/* ...existing inputs... */}
          <input
            type="file"
            accept="image/*"
            onChange={e => setForm({ ...form, image: e.target.files[0] })}
          /><input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
          />
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
            required
          />
          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
          <input
            placeholder="Place"
            value={form.place}
            onChange={e => setForm({ ...form, place: e.target.value })}
            required
          />
          <button type="submit">{editing ? 'Update Product' : 'Add Product'}</button>
        </form>
      )}

      <table border="1" cellPadding="5" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Place</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.category}</td>
              <td>{p.quantity}</td>
              <td>${p.price}</td>
              <td>{p.place}</td>
              <td>
                {p.image && <img src={`http://localhost:5000${p.image}`} alt={p.name} width="80" />}
              </td>

              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
