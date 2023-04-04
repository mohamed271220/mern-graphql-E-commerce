import dotenv from "dotenv";
dotenv.config();

const { MongoDB_URL } = process.env;

export { MongoDB_URL };
