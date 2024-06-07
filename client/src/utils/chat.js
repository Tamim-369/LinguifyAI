import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDgFJnPSvB-s4_t6bmBKrYFzLnECN8AbrM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function run(text, question, type) {
  let prompt = `Based on the text extracted from the PDF file, ${text}, what is the answer to the question ${question}? and do not include any thing like "based on this or that" or "based on the text extracted from the PDF file" unless the question's answer is not in the text.`;

  if (type) {
    prompt = prompt.replace(
      "world famous reader",
      `world famous poet, famous for answering questions in ${type}'s way`
    );
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const sendText = response.text();
    console.log(sendText);
    return sendText;
  } catch (error) {
    console.error("Error generating text:", error);
  }
}
