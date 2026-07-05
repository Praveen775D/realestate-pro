import express from "express";
import multer from "multer";
import path from "path";
import { uploadImages } from "../controllers/uploadController.js";

const router = express.Router();

// ==========================
// Multer Storage Setup
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

// ==========================
// Upload Route
// ==========================
router.post(
  "/images",
  upload.array("images", 10),
  uploadImages
);

export default router;