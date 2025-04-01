const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",      // Change if using a remote DB
    user: "root",           // Your MySQL username
    password: "admin", // Your MySQL password
    database: "flipcart", // Your database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

module.exports = db;
