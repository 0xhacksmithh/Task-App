import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import { SERVICES } from "./config/services.js";
import rateLimiter from "./middlewares/rateLimit.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);

/**
 * USER SERVICE ROUTES
 * /users
 */
app.use(
  "/users",
  createProxyMiddleware({
    target: `${SERVICES.USER + "/users"}`,
    changeOrigin: true,
    logLevel: "debug",
  }),
);

/**
 * POST SERVICE ROUTES
 * /posts
 */
app.use(
  "/posts",
  createProxyMiddleware({
    target: `${SERVICES.POST + "/posts"}`,
    changeOrigin: true,
  }),
);

app.listen(8080, () => {
  console.log("🚀 API Gateway running on port 8080");
});
