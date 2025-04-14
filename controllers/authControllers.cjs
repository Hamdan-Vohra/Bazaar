const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../models/db");

exports.register = async (req, res) => {
  const { username, password, role = "user" } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.query(
      "INSERT INTO Users (username, password, role) VALUES ($1, $2, $3)",
      [username, hash, role]
    );
    res.json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM Users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
