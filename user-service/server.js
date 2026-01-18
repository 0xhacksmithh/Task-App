import express from "express";
import { port } from "./config/index.js";
import { connectDB } from "./database/db.js";
import {
  signupController,
  signinController,
  getAllUsers,
  getReaders,
  getAuthors,
} from "./controllers/userControllers.js";
import { authenticate } from "./middleware/auth.middleware.js";
import { authorizeRoles } from "./middleware/role.middleware.js";
import { startGrpcServer } from "./grpc.js";

const app = express();

app.use(express.json());

// End-Points
app.get("/users", (req, res) => {
  res.json({
    message: "Hello from User Microservice",
  });
});

app.get("/users/helth", (req, res) => {
  res.json({
    message: "Health Is OK",
  });
});

app.post("/users/signup", signupController);

app.post("/users/signin", signinController);

app.get("/allAuthors", authenticate, authorizeRoles("admin"), getAuthors);

// Admin Only Routes
app.get("/allUsers", authenticate, authorizeRoles("admin"), getAllUsers);

app.get("/allReaders", authenticate, authorizeRoles("admin"), getReaders);

// Server
app.listen(port, () => {
  // Express Server
  console.log(`Server is running on port :: 3000`);
});

connectDB(); // DB Connection

startGrpcServer(); // gRPC Server
