import mongoose from "mongoose";

const productsListSchema = mongoose.Schema({
  id: { type: String },
  productName: { type: String, required: true },
  dosage: { type: Array },
  form: { type: Array, required: true },
  ingredient: { type: Array, required: true },
  laboratory: { type: String },
  agent: { type: String },
  country: { type: String },
  code: { type: String }
}, { timestamps: true });

var ListProducts = mongoose.model("ListProduct", productsListSchema);

export default ListProducts;