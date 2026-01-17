import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const db_uri = process.env.DB_URI;
const jwt_secret = process.env.JWT_SECRET;

export { port, db_uri, jwt_secret };
