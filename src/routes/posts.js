import express from "express";
import {
  AllPosts,
  UpdateActivity,
  DeletePost,
  PostThePost,
} from "../controllers/PostController.js";
import {upload} from "../utils/multer.js";
const router = express.Router();

// Protected routes
router.get("/", AllPosts);

router.post("/", upload.single("image"), PostThePost);
router.put("/:id", upload.single("image"), UpdateActivity);
router.delete("/:id",  DeletePost);

export default router;
