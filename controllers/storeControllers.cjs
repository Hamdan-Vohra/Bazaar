const pool = require("../models/db");

exports.get_stores_list = async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM Stores`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_filtered_products = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM Products WHERE store_id = $1",
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_filtered_stock_movements = async (req, res, next) => {
  const { store_id, start_date, end_date } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM StockMovement WHERE store_id = $1 AND timestamp BETWEEN $2 AND $3",
      [store_id, start_date, end_date]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_stock_report = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT name, stock_quantity FROM Products WHERE store_id = $1`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.add_new_store = async (req, res, next) => {
  const { name, location } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Stores (name, location) VALUES ($1, $2) RETURNING *",
      [name, location]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.manual_stock_movement = async (req, res, next) => {
  const { product_id, change, store_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO StockMovement (product_id, change, store_id) VALUES ($1, $2, $3) RETURNING *",
      [product_id, change, store_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
