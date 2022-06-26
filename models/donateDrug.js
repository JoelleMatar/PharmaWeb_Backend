import mongoose from "mongoose";

const donateDrugSchema = mongoose.Schema({
  id: { type: String },
  productName: { type: String, required: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: false },
}, { timestamps: true });

var DonateDrug = mongoose.model("DonateDrug", donateDrugSchema);

export default DonateDrug;