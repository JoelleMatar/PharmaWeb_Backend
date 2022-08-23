import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  id: { type: String },
  name: { type: String},
}, { timestamps: true });

var Category =  mongoose.model("Category", categorySchema);

export default Category;