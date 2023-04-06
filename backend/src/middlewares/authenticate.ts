import bcrypt from "bcrypt";
import { userCollection } from "../mongoose/schema/user";
import { BCRYPT_SECRET } from "../config";
export const authenticateMiddleware = async (
  email: string,
  password: string
) => {
  const check = await userCollection.find({ email });
  if (check.length > 0) {
    const isPasswordCorrect = await bcrypt.compare(
      password + BCRYPT_SECRET,
      check[0].password as any
    );
    if (isPasswordCorrect) {
      return check;
    } else {
      return isPasswordCorrect;
    }
  } else {
    return "this email isn't registered";
  }
};
