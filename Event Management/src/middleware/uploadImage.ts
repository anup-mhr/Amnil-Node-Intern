import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import logger from "../utils/logger";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
    cb(null, "./dev-data/img");
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  // check if the file type is allowed
  const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    logger.error("Invalid file type", { mimeType: file.mimetype });
    cb(new Error("Invalid file Type"));
  }
};

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: fileFilter,
});

export default uploadImage;

// usage in app.ts
// app.use(multer({ storage: fileStorage, fileFilter: fileFilter })
