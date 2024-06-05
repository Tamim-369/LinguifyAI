import express from "express";
import {
  Forget,
  GetUser,
  Login,
  Reset,
  SignUp,
  Verify,
} from "../controller/user.controllers.js";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/forget", Forget);
router.post("/verifyEmail", Verify);
router.put("/reset", Reset);
router.get("/getUser/:id", GetUser);
export default router;
