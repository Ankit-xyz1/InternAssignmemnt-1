import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  title: String,
  forCompany: String,
  code: { type: String, required: true, unique: true },
  isClaimed: { type: Boolean, default: false },
  claimedBy: {
    type: String,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Coupon", couponSchema);
