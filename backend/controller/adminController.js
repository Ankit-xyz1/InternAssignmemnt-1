import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js"

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "your_default_secret";

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(email,password)
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(200).json({ message: "Invalid email or password" });
    }
    
    password = admin.password
    if (password != admin.password) {
      return res.status(200).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ adminId: admin._id, email: admin.email }, SECRET_KEY, { expiresIn: "1h" });

    res.cookie("Admintoken", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict", 
      maxAge: 3600000, 
    });

    res.status(200).json({ sucess:true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
