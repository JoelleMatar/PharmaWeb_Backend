import mongoose from "mongoose";

const requestDrugSchema = mongoose.Schema({
  id: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  message: { type: String, required: false },
}, { timestamps: true });

var RequestDrug = mongoose.model("RequestDrug", requestDrugSchema);

export default RequestDrug;