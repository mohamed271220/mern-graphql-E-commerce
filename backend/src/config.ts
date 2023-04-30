import dotenv from "dotenv";
dotenv.config();

const {
  MongoDB_URL,

  BCRYPT_SECRET,
  BCRYPT_SALT_ROUNDS,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  CLOUD_ACCESS,
  API_KEY,
  API_SECRET,
  Stripe_key,
  Client_Url,
  Stripe_Public,
} = process.env;

export {
  MongoDB_URL,
  BCRYPT_SECRET,
  BCRYPT_SALT_ROUNDS,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  CLOUD_ACCESS,
  API_KEY,
  API_SECRET,
  Stripe_key,
  Client_Url,
  Stripe_Public,
};
