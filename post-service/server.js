import express from "express";
import { createPosts, fetchPosts } from "./controllers/postControllers.js";
import { connectDB } from "./database/db.js";
import { port } from "./config/index.js";

const app = express();

app.use(express.json());

// Routes
app.get("/tasks", fetchPosts);

app.post("/tasks", createPosts);

app.listen(port, () => {
  console.log(`Server is running on port :: ${port}`);
});

connectDB();
connectRabbitMQwithRetry();
