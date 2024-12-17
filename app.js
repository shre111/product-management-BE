const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

// Initialize Express app
const app = express();

app.use(cors());

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://dantanishreya:0vgmbkh7mDtHUWJB@cluster0.bny1r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use Routes
app.use('/api', productRoutes);

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
