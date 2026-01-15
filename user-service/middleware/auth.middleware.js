import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/index.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    // optional chaining
    return res.status(401).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, jwt_secret);
    req.user = payload; // { sub, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
