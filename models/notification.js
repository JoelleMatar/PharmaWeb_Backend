import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  id: { type: String },
  requestdrugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RequestDrug'
  },
  isRead: { type: Boolean, required: true, default: false }
  
}, { timestamps: true });

var Notification = mongoose.model("Notification", notificationSchema);

export default Notification;