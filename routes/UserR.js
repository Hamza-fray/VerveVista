import express from "express";
import UserController from "../controllers/UserC.js"; // Assuming .mjs extension for ESM
import {
  verifyForgetPwd,
  verifyToken,
  verifyAndAuth,
} from "../middlewares/verifyToken.js"; // Assuming .mjs extension for ESM
import multer from "multer";
const router = express.Router();

router.put("/", verifyToken, UserController.updateAccount);
router.delete("/", verifyToken, UserController.deleteUser);
router.get("/profile", verifyToken, UserController.getUser);
router.get("/", UserController.getAllUsers);

export default router;
