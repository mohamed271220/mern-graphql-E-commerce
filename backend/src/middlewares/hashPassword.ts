import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS, BCRYPT_SECRET } from "../config";

export const hashPassword = (pass: string) => {
  return bcrypt.hashSync(
    (pass + BCRYPT_SECRET) as unknown as string,
    Number(BCRYPT_SALT_ROUNDS as unknown as String)
  );
};
