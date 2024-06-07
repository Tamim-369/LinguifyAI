import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.routes.js";
import inputRouter from "./routes/input.routes.js";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const __dirname = path.resolve();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(fileUpload()); // Initialize file upload middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/input", inputRouter);

io.on("connection", (socket) => {
  console.log(` User connected:${socket.id}`);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist/index.html"));
});

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
