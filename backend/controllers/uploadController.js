// backend/controllers/uploadController.js
import fs from "fs/promises";
import path from "path";

const UPLOAD_FOLDER = "uploads";

// ======================================================
// Upload Multiple Images
// POST /api/upload/images
// ======================================================

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image.",
      });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const images = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: `${baseUrl}/uploads/${file.filename}`,
    }));

    return res.status(201).json({
      success: true,
      message: "Images uploaded successfully.",
      totalImages: images.length,
      images,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Get All Uploaded Images
// GET /api/upload/images
// ======================================================

export const getUploadedImages = async (req, res) => {
  try {
    const files = await fs.readdir(UPLOAD_FOLDER);

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const images = files.map((file) => ({
      filename: file,
      url: `${baseUrl}/uploads/${file}`,
    }));

    return res.status(200).json({
      success: true,
      totalImages: images.length,
      images,
    });
  } catch (error) {
    console.error("Read Images Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Delete Uploaded Image
// DELETE /api/upload/images/:filename
// ======================================================

export const deleteUploadedImage = async (req, res) => {
  try {
    const { filename } = req.params;

    const imagePath = path.join(UPLOAD_FOLDER, filename);

    try {
      await fs.access(imagePath);
    } catch {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    await fs.unlink(imagePath);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
      deletedFile: filename,
    });
  } catch (error) {
    console.error("Delete Image Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};