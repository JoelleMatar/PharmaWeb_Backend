import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
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
}, { timestamps: true });

var Cart = mongoose.model("Cart", cartSchema);

export default Cart;