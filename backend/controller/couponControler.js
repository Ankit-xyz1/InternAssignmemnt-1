import Coupon from "../models/CouponModel.js";

export const claimCoupon = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const { couponId } = req.body;
    if (!couponId) {
      return res
        .status(400)
        .json({ sucess: false, message: "Coupon ID is required" });
    }
    const coupon = await Coupon.findById(couponId);

    if (!coupon || coupon.isClaimed) {
      return res.status(404).json({
        sucess: false,
        message: "Coupon not found or already claimed",
      });
    }

    coupon.isClaimed = true;
    coupon.claimedBy = token;
    await coupon.save();

    res
      .status(200)
      .json({ sucess: true, message: "Coupon claimed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

//fetch all coupons

export const fetchUnclaimedCoupon = async (req, res) => {
  try {
    // Find all coupons where `isClaimed` is false
    const unclaimedCoupons = await Coupon.find({ isClaimed: false });

    res.status(200).json({ success: true, coupons: unclaimedCoupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchAllCoupon = async (req, res) => {
  try {
    // Find all coupons where `isClaimed` is false
    const allCoupons = await Coupon.find({});

    res.status(200).json({ success: true, coupons: allCoupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleCouponStatus = async (req, res) => {
  try {
    const { couponId } = req.body;
    if (!couponId) {
      return res.status(400).json({ message: "Coupon ID is required" });
    }

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    // Toggle the `isClaimed` status
    coupon.isClaimed = !coupon.isClaimed;

    // If unclaimed, remove `claimedBy`
    if (!coupon.isClaimed) {
      coupon.claimedBy = null;
    }

    await coupon.save();

    res
      .status(200)
      .json({ message: `Coupon status updated successfully`, coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const createCoupon = async (req, res) => {
  try {
    const { title, forCompany, code } = req.body;

    // Validate request data
    if (!title || !forCompany || !code) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    // Create a new coupon
    const newCoupon = new Coupon({
      title,
      forCompany,
      code,
    });

    // Save coupon to database
    await newCoupon.save();

    res
      .status(201)
      .json({ message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
