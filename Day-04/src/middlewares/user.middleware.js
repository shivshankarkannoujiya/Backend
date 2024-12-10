import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const userMiddleware = async function (req, res, next) {
  const token =
    req.cookies.accessToken ||
    req.body.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.USER_ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error?.message || "Invalid access token",
    });
  }
};

export { userMiddleware };
