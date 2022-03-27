import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String },
  firstName: { type: String},
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  role: { type: Number}
}, { timestamps: true });

var User =  mongoose.model("User", userSchema);

export default User;