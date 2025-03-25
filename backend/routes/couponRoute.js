import { Router } from "express";
import { checkToken } from "../middleware/checktoken.js";
import { claimCoupon, createCoupon, fetchAllCoupon, fetchUnclaimedCoupon, toggleCouponStatus } from "../controller/couponControler.js";
import { adminVerify } from "../middleware/adminAuth.js";

const couponRoute = Router();

couponRoute.post('/claim', checkToken,claimCoupon)
couponRoute.get('/fetchCoupon',fetchUnclaimedCoupon)
couponRoute.get('/fetchAllCoupon',adminVerify,fetchAllCoupon)
couponRoute.post('/createCoupon',adminVerify,createCoupon)
couponRoute.post('/toggleCouponStatus',adminVerify,toggleCouponStatus)
export default couponRoute