import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";
import { Response, Router, Request } from "express";

export const verfiyRefToken = async (refToken: string) => {
  try {
    const decode = Jwt.verify(
      refToken,
      REFRESH_TOKEN_SECRET as unknown as string
    );
    return decode;
  } catch (err) {
    const error: Error = new Error("wrong ref token");
    throw error;
  }
};

export const getNewRefToken = async (req: Request, res: Response) => {
  const { refToken } = req.body;
  if (!refToken) {
    res.json({});
  } else {
    let { result } = (await verfiyRefToken(refToken)) as any;
    if (result[0]?._id || result?._id) {
      const accessToken = Jwt.sign(
        { result },
        ACCESS_TOKEN_SECRET as unknown as string
      );
      const refreshToken = Jwt.sign(
        { result },
        REFRESH_TOKEN_SECRET as unknown as string
      );
      res.cookie("access_token", accessToken);
      res.cookie("refresh_token", refreshToken);
      res.json({ accessToken });
      return true;
    } else {
      return false;
    }
  }
};

export const AuthRouter = Router();
AuthRouter.route("/auth/newRefToken").post(getNewRefToken);
