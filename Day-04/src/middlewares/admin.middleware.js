import { Admin } from "../models/admin.models.js";
import jwt from "jsonwebtoken";

const adminMiddleware = async function (req, res, next) {
  const token =
    req.body.accessToken ||
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ADMIN_ACCESS_TOKEN_SECRET
    );

    const admin = await Admin.findById(decodedToken?._id).select("-password");

    if (!admin) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error?.message || "Invalid token",
    });
  }
};


export {
  adminMiddleware
}