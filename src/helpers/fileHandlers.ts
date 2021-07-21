import multer from "multer";
import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import { configService } from "../config.service";

const router = express.Router();

const cloud = cloudinary.v2;

cloud.config(configService.getCloudinaryConfig());

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()} - ${file.originalname}`);
  },
});

// file validation

const fileFilter = (req: any, file: any, cb: any) => {
  console.log(file.mimetype);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Format" }, false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

const uploader = (file: any, folder: any) => {
  return new Promise((resolve) => {
    cloud.uploader.upload(file, (result: any) => {
      resolve({
        url: result.url,
        id: result.public_id,
      });
    });
  });
};

router.post("/form-images", upload.single("image"), async (req: Request, res: Response) => {
  try {
    const uploadedFile = req?.file?.path;
    if (uploadedFile) {
      const result = await cloud.uploader.upload(uploadedFile);
      console.log(result);
    }

    console.log(req.file);
  } catch (err) {
    console.log(err);
  }
});

export default router;
