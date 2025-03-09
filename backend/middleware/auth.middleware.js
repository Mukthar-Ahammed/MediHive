import jwt from "jsonwebtoken";
import User from "../src/models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized-No Token Provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user to the request object and proceed
        req.user = user;
        next();

    } catch (error) {
        console.error("Error occurred in protect route middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
