const express = require('express');
const mysql = require('mysql2/promise');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors());
app.use(express.json());

// ✅ MySQL Database connection pool
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "flipcart",
});

// ✅ Utility: Calculate Dynamic Price
function calculateDynamicPrice(basePrice, demandLevel, stockQuantity) {
    if (typeof basePrice !== 'number' || isNaN(basePrice)) {
        throw new Error('Invalid base price');
    }
    if (typeof demandLevel !== 'number' || isNaN(demandLevel)) {
        throw new Error('Invalid demand level');
    }
    if (typeof stockQuantity !== 'number' || isNaN(stockQuantity)) {
        throw new Error('Invalid stock quantity');
    }

    let price = basePrice;

    if (demandLevel >= 7) price += basePrice * 0.15;
    else if (demandLevel <= 3) price -= basePrice * 0.10;

    if (stockQuantity <= 10) price += basePrice * 0.10;

    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 6) price -= basePrice * 0.10;

    return Number(price.toFixed(2));
}


app.get('/', async (req, res) => {
    try {
      const [products] = await db.query('SELECT * FROM products_dynamic');
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// ✅ WebSocket connection
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// // ✅ Start Server
// server.listen(3000, () => {
//     console.log('✅ Server running on http://localhost:3000');
// });
