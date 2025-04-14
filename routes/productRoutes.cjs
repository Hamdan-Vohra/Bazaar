const express = require("express");
const productControllers = require("../controllers/products");
const { authenticate } = require("../middleware/auth.js");
const router = express.Router();

router.get("/", authenticate, productControllers.get_product_catalog);

router.post("/", authenticate, productControllers.add_product);

router.put("/:id/stock", authenticate, update_stock);

module.exports = router;
