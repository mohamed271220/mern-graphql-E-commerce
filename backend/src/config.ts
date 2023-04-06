import dotenv from "dotenv";
dotenv.config();

const {
  MongoDB_URL,

  BCRYPT_SECRET,
  BCRYPT_SALT_ROUNDS,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
} = process.env;

export {
  MongoDB_URL,
  BCRYPT_SECRET,
  BCRYPT_SALT_ROUNDS,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
};
