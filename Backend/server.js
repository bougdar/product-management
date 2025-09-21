require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');          // ✅ Add this
const connectDB = require('./config/connect');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Serve the "public" folder
// This line already exposes /public so that /images/... is reachable.
app.use(express.static(path.join(__dirname, 'public')));

// Or explicitly (either way works):
// app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

connectDB();

// API routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
