const pool = require("./models/db");

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(10) DEFAULT 'user'
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Stores (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INTEGER DEFAULT 0,
        store_id INTEGER REFERENCES Stores(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS StockMovements (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES Products(id) ON DELETE CASCADE,
        change INTEGER NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        store_id INTEGER REFERENCES Stores(id) ON DELETE CASCADE
      );
    `);

    console.log("Tables created or verified.");
    process.exit();
  } catch (error) {
    console.erroror("Error initializing database:", err.message);
    process.exit(1);
  }
};

initDb();
