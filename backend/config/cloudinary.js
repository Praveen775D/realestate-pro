import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

console.log("CLOUDINARY_NAME =", process.env.CLOUDINARY_NAME);
console.log("CLOUDINARY_KEY =", process.env.CLOUDINARY_KEY);
console.log(
  "CLOUDINARY_SECRET =",
  process.env.CLOUDINARY_SECRET ? "Loaded" : "Missing"
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary;