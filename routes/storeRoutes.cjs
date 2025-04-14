const express = require("express");
const storeControllers = require("../controllers/storeControllers.cjs");
const { authenticate, super_authenticate } = require("../middleware/auth.js");
const router = express.Router();

// Get List Of Stores
router.get("/", authenticate, storeControllers.get_stores_list);

// Get Products Filtered by Store
router.get(
  ":store_id/products",
  authenticate,
  storeControllers.get_filtered_products
);

// Print Stock Report of All Products of the Store
router.get(
  "/:store_id/stock-report",
  authenticate,
  storeControllers.get_stock_report
);

// Filter Stock Movements of Store by date
router.get(
  "/stock-movements",
  authenticate,
  storeControllers.get_filtered_stock_movements
);

// Admin Only
router.post("/", super_authenticate, storeControllers.add_new_store);

router.post(
  "/stock-movements",
  super_authenticate,
  storeControllers.manual_stock_movement
);

module.exports = router;
