import jwt from "jsonwebtoken";
export const checkToken = async (req, res, next) => {
  const tokenCheck = req.cookies.token;
  const SECRET_KEY = process.env.JWT_SECRET || "xxxxxxx";
  console.log(tokenCheck);
  if (tokenCheck) {
    try {
      const decoded = jwt.verify(tokenCheck, SECRET_KEY);
      console.log(decoded);
    } catch (error) {
      console.log(error);
    }
    //console.log(decoded)
    // if (!decoded) {
    //   return res.json({
    //     succes: false,
    //     message: "fake u are",
    //   });
    next();
  } else {
    return res.json({
      succes: false,
      message: "no token found",
    });
  }
};
