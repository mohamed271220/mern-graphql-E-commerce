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
      console.log(check);
      return check;
    } else {
      return isPasswordCorrect;
    }
  } else {
    return "this email isn't registered";
  }
};

export const checkOldPass = async (_id: string, password: string) => {
  const check = await userCollection.find({ _id });
  if (check.length > 0) {
    const isPasswordCorrect = await bcrypt.compare(
      password + BCRYPT_SECRET,
      check[0].password as any
    );
    if (isPasswordCorrect) {
      return "your password is correct";
    } else {
      return isPasswordCorrect;
    }
  } else {
    return "this email isn't registered";
  }
};
