import mongoose from "mongoose";

const logsSchema = mongoose.Schema({
  id: { type: String },
  productId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' 
  },
  pharmaId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  productName: { type: String, required: true},
  type: { type: String, required: true },
  previousStock: { type: Number, required: true },
  currentStock: { type: Number, required: true },
  supplierName: { type: String},

}, { timestamps: true });

var Logs = mongoose.model("Logs", logsSchema);

export default Logs;