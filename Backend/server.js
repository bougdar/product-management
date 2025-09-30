require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/connect');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


connectDB();

// API routes
app.use('/api/products', productRoutes);
app.use('/api', authRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
