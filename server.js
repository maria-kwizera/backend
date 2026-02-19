
require('dotenv').config({ path: __dirname + '/.env' });
console.log('DATABASE_URI (debug):', process.env.DATABASE_URI);
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Routers
const procurementRoutes = require("./routes/procurementRoutes");
const salesRoutes = require("./routes/salesRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/procurement", procurementRoutes);
app.use("/sales", salesRoutes);
app.use("/users", userRoutes);

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed", err));

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KGL API",
      version: "1.0.0",
      description: "API documentation for Karibu Groceries LTD backend",
    },
  },
  apis: [__dirname + "/routes/*.js", __dirname + "/routes/**/*.js"],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
