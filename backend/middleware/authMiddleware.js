import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Get token from cookies

    if (!token)
      return res.status(401).json({
        message: "Unauthorized, so we are protecting this action from you",
      }); // If no token, return error

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    const user = await UserModel.findById(decoded.userId).select("-password"); // Get user from token

    req.user = user; // Add user to request object so that it can be accessed in the next middleware/route handler

    next(); // Continue to the next middleware or route handler.
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in signupUser: ", err.message);
  }
};

export default protectRoute;
