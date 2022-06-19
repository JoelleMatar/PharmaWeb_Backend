import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: { type: String },
  pharmaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productName: { type: String, required: true },
  dosage: { type: Array },
  form: { type: Array, required: true },
  ingredient: { type: Array, required: true },
  stock: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  category: { type: Boolean, required: true },
  agent: { type: String },
  country: { type: String },
  laboratory: { type: String },
  code: { type: String },
}, { timestamps: true });

var Product = mongoose.model("Product", productSchema);

export default Product;