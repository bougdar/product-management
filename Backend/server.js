require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const connectDB = require('./config/connect');

const app = express();


app.use(express.json());
app.use(cors());


connectDB();


app.get('/', (req, res) => {
  res.send('Server is running');
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
