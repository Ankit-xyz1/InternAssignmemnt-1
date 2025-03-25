import { Router } from "express";
import { adminLogin } from "../controller/adminController.js";
import { adminVerify } from "../middleware/adminAuth.js";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/verifyAdmin", adminVerify, (req, res) => {
  res.json({ sucess: true });
});
adminRouter.get("/logout", adminVerify, (req, res) => {
  res.clearCookie("Admintoken"); 
  return res.json({ success: true, message: "Logged out successfully" });
});

export default adminRouter;
