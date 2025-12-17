const express = require('express');
const router = express.Router();
// const tripay = require('../services/payment/tripay.provider');

router.post('/create', async (req, res) => {
    // Mock Transaction Creation
    const { packageId, phone } = req.body;
    
    // Call Tripay API here
    
    res.json({
        success: true,
        data: {
            reference: "TRX-" + Date.now(),
            amount: 5000,
            checkout_url: "https://tripay.co.id/checkout/..."
        }
    });
});

router.post('/callback', async (req, res) => {
    // Verify Signature
    // Process Payment
    // Generate Voucher (Call MikroTik Service)
    // Send WhatsApp (Call WA Service)
    
    res.json({ success: true });
});

module.exports = router;
