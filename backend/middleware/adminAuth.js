import { configDotenv } from "dotenv";
import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

export const adminVerify = async (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET || "xxxxxxx";
  try {
    // Get the token from cookies
    const Admintoken = req.cookies.token;
    if (!Admintoken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token

    const decoded = jwt.verify(Admintoken, SECRET_KEY);
    console.log(decoded);

    // Check if the admin exists in the database
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized: Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
