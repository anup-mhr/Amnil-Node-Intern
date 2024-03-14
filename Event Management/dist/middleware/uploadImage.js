"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./dev-data/img");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    // check if the file type is allowed
    const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        logger_1.default.error("Invalid file type", { mimeType: file.mimetype });
        cb(new Error("Invalid file Type"));
    }
};
const uploadImage = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
    },
    fileFilter: fileFilter,
});
exports.default = uploadImage;
// usage in app.ts
// app.use(multer({ storage: fileStorage, fileFilter: fileFilter })
