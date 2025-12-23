import jwt from 'jsonwebtoken';

const isAuth = async (req, res,next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Invalid user with no token" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!verifyToken) {
        return res.status(400).json({ massage: "Invalid user token is not verified" });
      }

      req.userId = verifyToken.userId;
      next();
  } catch (error) {
    return res.status(500).json({ message: `Error in is authentication ${error}` });
  }
}

export default isAuth;