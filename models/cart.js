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
  pharmaId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  quantity: { type: Number, required: true },
  pharmacyName: { type: String, required: true },
  pharmacyPaymentOptions: { type: Array, required: true },
  deliverOption: { type: String, required: true },
  totalPrice: { type: Number },
  status: { type: Number},
  prescription: { type: String,}
}, { timestamps: true });

var Order = mongoose.model("Order", orderSchema);

export default Order;