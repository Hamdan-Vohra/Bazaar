const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const throttle = require("./middleware/throttle");

app.use(cors());
app.use(express.json());
app.use(throttle);

app.use("/auth", require("./routes/authRoutes"));
app.use("/stores", require("./routes/storeRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/stock-movements", require("./routes/stockRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
