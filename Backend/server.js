require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connect');
const productRoutes = require('./routes/productRoutes');
const app = express();


app.use(express.json());
app.use(cors());
app.use(express.static('public'));

connectDB();

app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send('Server is running');
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
