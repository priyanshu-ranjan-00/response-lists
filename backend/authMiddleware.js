const jwt = require("jsonwebtoken");
const UserModel = require("./Models/UserModel");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ errorMessage: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user; // attaching user to the request object

    next();
  } catch (error) {
    // console.error("Authentication error:", error.message);
    res.status(401).json({ errorMessage: "Authentication failed." });
  }
};

module.exports = authMiddleware;
