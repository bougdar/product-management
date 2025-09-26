import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ setToken }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/products" style={{ marginRight: '1rem' }}>Products</Link>
      <Link to="/users" style={{ marginRight: '1rem' }}>Users</Link>
      <Link to="/login" onClick={handleLogout}>Logout</Link>
    </nav>
  );
}
