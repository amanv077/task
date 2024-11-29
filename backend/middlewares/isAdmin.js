import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Import User model to check roles

const isAdmin = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated. Token is missing.",
        success: false,
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token. Authentication failed.",
        success: false,
      });
    }

    // Attach the decoded user ID to the request object
    req.id = decoded.userId;

    // Fetch the user from the database using the user ID from the token
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "User not authorized. Admin role required.",
        success: false,
      });
    }

    // Proceed with the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in authentication or authorization:", error);
    return res.status(500).json({
      message: "An error occurred. Please try again.",
      success: false,
    });
  }
};

export default isAdmin;
