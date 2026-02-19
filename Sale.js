const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  saleType: { type: String, enum: ['cash', 'credit'], required: true },
  produceName: { type: String, required: true },
  produceType: { type: String },
  tonnage: { type: Number, required: true, min: 100 },
  amountPaid: { type: Number },
  amountDue: { type: Number },
  buyerName: { type: String, required: true, minlength: 2 },
  buyerNIN: { type: String },
  location: { type: String },
  contacts: { type: String },
  salesAgentName: { type: String, required: true, minlength: 2 },
  date: { type: String },
  time: { type: String },
  dueDate: { type: String },
  dispatchDate: { type: String }
});

module.exports = mongoose.model('Sale', saleSchema);
