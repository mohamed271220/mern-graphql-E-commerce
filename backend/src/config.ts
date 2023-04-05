import dotenv from "dotenv";
dotenv.config();

const {
  MongoDB_URL,

  BCRYPT_SECRET,
  BCRYPT_SALT_ROUNDS,
} = process.env;

export { MongoDB_URL, BCRYPT_SECRET, BCRYPT_SALT_ROUNDS };
