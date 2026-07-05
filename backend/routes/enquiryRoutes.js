import express from "express";

import {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", createEnquiry);

router.get("/", getEnquiries);

router.put("/:id", updateEnquiry);

router.delete("/:id", deleteEnquiry);

export default router;