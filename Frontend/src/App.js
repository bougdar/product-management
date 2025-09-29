import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Users from './pages/Users';
import LoginPage from './pages/LoginPage';
import Orders from './pages/Orders';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      {token && <Navbar setToken={setToken} />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/products" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route
          path="/products"
          element={token ? <Products /> : <Navigate to="/login" />}
        /><Route
          path="/orders"
          element={token ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={token ? <Users /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
