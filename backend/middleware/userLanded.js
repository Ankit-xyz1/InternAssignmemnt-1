import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "XXXXXXXXX";

export const generateAndSendJWT = (req, res,next) => {
  const tokenCheck = req.cookies.token;
  if(tokenCheck){
    const decoded = jwt.verify(tokenCheck, SECRET_KEY);
    if(decoded){
      return res.json({
        succes:false,
        message:"session is already ongoingh"
      })
    }
  }
  const ID =  nanoid(7);
  console.log(req.ip);
  const token = jwt.sign(ID, SECRET_KEY);
  res.cookie("token", token, {
    httpOnly: true, // Prevents access from JavaScript (secure)
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict", // Prevents CSRF attacks
    maxAge: 3600000, // 1 hour expiration
  });

  next()
};
