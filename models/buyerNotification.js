import mongoose from "mongoose";

const buyerNotificationSchema = mongoose.Schema({
  id: { type: String },
  donateDrugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DonateDrug'
  },
  isRead: { type: Boolean, required: true, default: false }
  
}, { timestamps: true });

var BuyerNotification = mongoose.model("buyerNotification", buyerNotificationSchema);

export default BuyerNotification;