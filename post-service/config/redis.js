import Redis from "ioredis";
import { redisHost, redisPort } from "./index.js";

export const redis = new Redis({
  host: redisHost,
  port: redisPort,
});
