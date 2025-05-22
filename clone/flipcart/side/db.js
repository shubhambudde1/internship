import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'root', // Replace with your database user
  password: 'admin', // Replace with your database password
  database: 'flipcart' // Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }

  console.log('Connected to database as id ' + connection.threadId);
});

export default connection;
