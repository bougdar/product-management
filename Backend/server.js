require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/connect');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


connectDB();

// API routes
app.use('/api/products', productRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
