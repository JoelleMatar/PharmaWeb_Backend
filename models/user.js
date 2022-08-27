import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  firstName: { type: String},
  lastName: { type: String },
  pharmacyName: {type: String},
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  role: { type: Number},
  city: { type: String },
  registrationYear: { type: Number },
  deliveryOptions: { type: Array },
  paymentOptions: { type: Array },
  pharmacyLicense: { type: String },
  maps: { type: String }
}, { timestamps: true });

var User =  mongoose.model("User", userSchema);

export default User;