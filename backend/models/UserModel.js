import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    ip: { type: String, required: true },
    sessionId: { type: String, required: true },
    claimedCoupons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }],
    lastClaimedAt: { type: Date, default: null }, 
})

const userModel = mongoose.model("User", UserSchema)

export default userModel;