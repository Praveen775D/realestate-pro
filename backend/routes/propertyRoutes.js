import express from "express";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getAvailableProperties,
  searchProperties,
} from "../controllers/propertyController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

// =======================================
// Public Routes
// =======================================

// Get all properties
router.get("/", getAllProperties);

// Featured properties
router.get("/featured", getFeaturedProperties);

// Available properties
router.get("/available", getAvailableProperties);

// Search properties
router.get("/search", searchProperties);

// Get single property
router.get("/:id", getPropertyById);

// =======================================
// Protected Routes
// =======================================

// Create property
router.post(
  "/",
  protect,
  upload.single("image"),
  createProperty
);

// Update property
router.put("/:id", protect, updateProperty);

// Delete property
router.delete("/:id", protect, deleteProperty);

export default router;