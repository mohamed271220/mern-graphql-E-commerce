import { Router, Request, Response } from "express";
import { userCollection } from "../mongoose/schema/user.js";
import { upload } from "../middlewares/upload.js";
import productCollection from "../mongoose/schema/product.js";
const updateUserImgFn = async (req: Request, res: Response) => {
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

const uploadProductImgs = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(req.files);
  const images: any = [];
  if (req.files?.length && Array.isArray(req.files)) {
    req.files.map((fil: Express.Multer.File) => {
      images.push({ productPath: fil.path, ProductName: fil.originalname });
    });
  }
  console.log(images);
  const result = await productCollection.findByIdAndUpdate(id, { images });

  // console.log(result);
};

export const uploadRoute = Router();
uploadRoute.route("/upload/:id").patch(upload.single("image"), updateUserImgFn);
uploadRoute
  .route("/products/images/upload/:id")
  .patch(upload.array("images"), uploadProductImgs);
