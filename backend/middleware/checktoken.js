export const checkToken = async (req, res, next) => {
  const tokenCheck = req.cookies.token;
  if (tokenCheck) {
    const decoded = jwt.verify(tokenCheck, SECRET_KEY);
    if (!decoded) {
      return res.json({
        succes: false,
        message: "fake u are",
      });
      next();
    } else {
      return res.json({
        succes: false,
        message: "no token found",
      });
    }
  }
};
