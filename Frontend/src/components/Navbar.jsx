import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/products" style={{ marginRight: '1rem' }}>Products</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
}
