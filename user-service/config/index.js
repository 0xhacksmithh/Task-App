import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const jwt_secret = process.env.jwt_secret;

const db_uri = process.env.DB_URI;

export { port, jwt_secret, db_uri };
