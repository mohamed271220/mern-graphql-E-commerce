"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const config_js_1 = require("../config.js");
cloudinary_1.default.v2.config({
    cloud_name: config_js_1.CLOUD_ACCESS,
    api_key: config_js_1.API_KEY,
    api_secret: config_js_1.API_SECRET,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default.v2,
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
exports.upload = (0, multer_1.default)({ storage });
