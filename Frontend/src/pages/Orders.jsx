import { useState, useEffect } from 'react';
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder
} from '../services/orderService';
import { getProducts } from '../services/productService';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: '',
    customerName: '',
    quantity: 1,
    type: 'in delivery', // keep for editing only
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      // When updating, include type (can be changed)
      await updateOrder(editing, {
        customerName: form.customerName,
        quantity: Number(form.quantity),
        type: form.type,
      });
      setEditing(null);
    } else {
      // When creating, do NOT send type so backend default applies
      await createOrder({
        productId: form.productId,
        customerName: form.customerName,
        quantity: Number(form.quantity),
      });
    }

    setForm({
      productId: '',
      customerName: '',
      quantity: 1,
      type: 'in delivery',
    });
    setShowForm(false);
    fetchOrders();
  };

  const handleEdit = (order) => {
    setForm({
      productId: order.product?._id || '',
      customerName: order.customerName,
      quantity: order.quantity,
      type: order.type,
    });
    setEditing(order._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteOrder(id);
    fetchOrders();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Orders</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Order'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
          {/* Product dropdown only visible on create */}
          {!editing && (
            <select
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>
          )}

          <input
            placeholder="Customer Name"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            min="1"
            required
          />

          {/* Type dropdown ONLY shown when editing */}
          {editing && (
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {['in delivery','delivered','pending','return broken','return scam'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          )}

          <button type="submit">
            {editing ? 'Update Order' : 'Create Order'}
          </button>
        </form>
      )}

      <table border="1" cellPadding="5" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.customerName}</td>
              <td>{o.product?.name || 'Deleted Product'}</td>
              <td>{o.quantity}</td>
              <td>{o.type}</td>
              <td>
                <button onClick={() => handleEdit(o)}>Edit</button>
                <button onClick={() => handleDelete(o._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
