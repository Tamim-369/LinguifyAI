import express from "express";
import { chat } from "../controller/input.controller.js";
// import { PDFToText } from "../controller/input.controller.js";

const router = express.Router();

router.post("/chat", chat);

export default router;
