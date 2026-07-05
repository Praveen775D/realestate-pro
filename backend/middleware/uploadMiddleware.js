import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder automatically
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Storage Configuration
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads");

  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);

  }

});

// Allow only images
const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpeg|jpg|png|webp/;

  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {

    cb(null, true);

  } else {

    cb(new Error("Only JPG, PNG and WEBP images are allowed"));

  }

};

// Upload Middleware
const upload = multer({

  storage,

  limits: {

    fileSize: 5 * 1024 * 1024

  },

  fileFilter

});

export default upload;