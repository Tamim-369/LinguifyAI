import { GoogleGenerativeAI } from "@google/generative-ai";
import run from "../utils/chat.js";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function chat(req, res) {
  const { text, question } = req.body;
  const response = await run(text, question);
  return res.status(200).json({ answer: response });
}
