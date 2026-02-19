const mongoose = require("mongoose");

const procurementSchema = new mongoose.Schema({
  produceName: { type: String, required: true },
  produceType: { type: String, required: true, minlength: 2 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  tonnageKg: { type: Number, required: true, min: 100 },
  costUgx: { type: Number, required: true, min: 10000 },
  dealerName: { type: String, required: true, minlength: 2 },
  branch: { type: String, enum: ["Maganjo", "Matugga"], required: true },
  contact: { type: String, required: true },
  sellingPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Procurement", procurementSchema);
