import { Router, Request, Response } from "express";
import { userCollection } from "../mongoose/schema/user.js";
import { upload } from "../middlewares/upload.js";
const uploadFn = async (req: Request, res: Response) => {
  try {
    console.log(req.file);
    const file = req.file;
    const id = req.params.id;
    if (file) {
      const result = await userCollection.findByIdAndUpdate(id, {
        image: file.path,
      });
      console.log(result);
    } else {
      res.json({ msg: "faild to upload" });
    }
  } catch (err) {
    console.log((err as Error).message);
  }
};

export const uploadRoute = Router();
uploadRoute.route("/upload/:id").patch(upload.single("image"), uploadFn);
