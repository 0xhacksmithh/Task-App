import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/index.js";
import { authClient } from "../grpc/auth.client.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, jwt_secret);

    // gRPC call to verify UserId and Role to User Service
    authClient.ValidateUser(
      {
        userId: payload.userId,
        role: payload.type,
      },
      (err, result) => {
        console.log(`gRPC Error Is :: ${err}`);
        console.log(`typoOF Messgae from gRPC :: ${typeof result}`);
        console.log(`Result From gRPC :: ${result}`);
        // if (err || !result.valid) {
        //   return res.status(401).json({
        //     message: result.message,
        //   });
        // }

        // req.user = {
        //   userId: payload.userId,
        //   role: payload.role,
        //   name: payload.name,
        // };

        next();
      },
    );
  } catch {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
