import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token =
        req.body.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "") ||
        req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            message: "Token is missing. Please provide a valid access token",
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (decodedToken.exp) {
            return res.status(401).json({
                message: "Token has exppired. Please login again ",
            });
        }

        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User does not exist or access is unauthorized",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired. Please login again ",
            });
        }

        console.log("Token verification error: ", error.message);
        return res.status(500).json({
            message: "Invalid or malformed token",
        });
    }
};

export { authMiddleware };
