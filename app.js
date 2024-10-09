const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to the Online Store Backend!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
