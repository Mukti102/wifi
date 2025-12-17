require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const paymentRoutes = require('./src/routes/payment.routes');
const checkoutRoutes = require('./src/routes/checkout.routes');

app.use('/api/payment', paymentRoutes);
app.use('/api/checkout', checkoutRoutes);

app.get('/', (req, res) => {
  res.send('Fiberasinet Backend API is Running');
});

// Create Voucher Endpoint (Internal)
app.post('/api/internal/create-voucher', async (req, res) => {
    // Logic to call MikroTik API
    res.json({ success: true, message: "Voucher created" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
