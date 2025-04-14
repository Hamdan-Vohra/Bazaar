const jwt = require("jsonwebtoken");

const user_authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ error: "Invalid token | Auth Failed" });
    req.user = user;
    next();
  });
};

// this will also authorize the user's role to be admin as some APIs are restricted for admin only
const super_authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || req.user.role != "admin")
      return res
        .status(403)
        .json({ error: "Auth Failed", message: "Please login as an admin" });
    req.user = user;
    next();
  });
};

module.exports = { user_authenticate, super_authenticate };
