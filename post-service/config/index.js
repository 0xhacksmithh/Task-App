import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const db_uri = process.env.DB_URI;
const jwt_secret = process.env.JWT_SECRET;

const rabbitMq_url = process.env.RABBITMQ_URL;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

export { port, db_uri, jwt_secret, rabbitMq_url, redisHost, redisPort };
