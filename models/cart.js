import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  id: { type: String },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' 
  },
  quantity: { type: Number, required: true },
  deliverOption: { type: String, required: true },
  totalPrice: { type: Number },
  status: { type: Number},
}, { timestamps: true });

var Order = mongoose.model("Order", orderSchema);

export default Order;