import express from "express";
import { createServer } from "http"; // Import http to create a server
import { Server } from "socket.io"; // Import socket.io
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.routes.js";
import inputRouter from "./routes/input.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const __dirname = path.resolve();

// Create a http server
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(fileUpload()); // Initialize file upload middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/input", inputRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist/index.html"));
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle custom events
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
