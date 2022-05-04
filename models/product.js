import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: { type: String },
  productName: { type: String, required: true },
  dosage: { type: Array },
  form: {type: Array, required: true},
  ingredient: { type: Array, required: true },
  stock: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String }
}, { timestamps: true });

var Product =  mongoose.model("Product", productSchema);

export default Product;