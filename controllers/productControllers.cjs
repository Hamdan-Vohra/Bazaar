const pool = require("../models/db");

exports.get_product_catalog = async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT *  FROM Products `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.add_product = async (req, res) => {
  const { name, description, price, store_id, stock_quantity } = req.body;

  if (!name || !price || !store_id) {
    return res
      .status(400)
      .json({ error: "Required fields: name, price, store_id" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO Products (name, description, price, store_id, stock_quantity)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description || "", price, store_id, stock_quantity || 0]
    );
    res.status(201).json({ message: "Product added", product: result.rows[0] });
  } catch (err) {
    console.error("Add Product Error:", err.message);
    res.status(500).json({ error: "Failed to add product" });
  }
};

exports.update_stock = async (req, res) => {
  const productId = req.params.id;
  const { stock_quantity } = req.body;

  if (stock_quantity === undefined || isNaN(stock_quantity)) {
    return res.status(400).json({ error: "Invalid or missing stock quantity" });
  }

  try {
    const result = await pool.query(
      `UPDATE Products SET stock_quantity = $1 WHERE id = $2 RETURNING *`,
      [stock_quantity, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Stock updated", product: result.rows[0] });
  } catch (err) {
    console.error("Update Stock Error:", err.message);
    res.status(500).json({ error: "Failed to update stock" });
  }
};
