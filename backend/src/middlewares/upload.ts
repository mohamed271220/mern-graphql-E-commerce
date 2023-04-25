import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { API_KEY, API_SECRET, CLOUD_ACCESS, MongoDB_URL } from "../config.js";

cloudinary.v2.config({
  cloud_name: CLOUD_ACCESS,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: (req, file) => {
    console.log("first");
    console.log(file);
    return {
      folder: "data",
      public_id: file.originalname,
      // public_id: file.originalname.replace( /\.[^/.]+$/, "" ),
      // format: file.mimetype.split( '/' )[1],
    };
  },
});

export const upload = multer({ storage });
