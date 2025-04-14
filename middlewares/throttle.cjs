const rateLimit = require("express-rate-limit");

exports.limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many requests,overwhelming so try again later",
});
