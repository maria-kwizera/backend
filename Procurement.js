const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
  produceName: { type: String, required: true, match: /^[a-zA-Z0-9 ]+$/ },
  produceType: { type: String, required: true, minlength: 2, match: /^[a-zA-Z ]+$/ },
  date: { type: String, required: true },
  time: { type: String, required: true },
  tonnage: { type: Number, required: true, min: 100 },
  cost: { type: Number, required: true, min: 10000 },
  dealerName: { type: String, required: true, minlength: 2, match: /^[a-zA-Z0-9 ]+$/ },
  branch: { type: String, required: true, enum: ['Maganjo', 'Matugga'] },
  contact: { type: String, required: true, match: /^\+?\d{9,15}$/ },
  sellingPrice: { type: Number, required: true, min: 10000 }
});

module.exports = mongoose.model('Procurement', procurementSchema);
