const express = require('express');
const router = express.Router();

router.get('/packages', (req, res) => {
    res.json([
        { id: "1h", name: "Paket Kilat", price: 2000 },
        { id: "1d", name: "Paket Harian", price: 5000 },
        { id: "1m", name: "Paket Keluarga", price: 150000 }
    ]);
});

module.exports = router;
