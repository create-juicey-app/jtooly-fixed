const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://196.148.141.88.rev.sfr.net:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const clientIpAddress =
    socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;
  console.log(`A user connected. IP: ${clientIpAddress}`);

  socket.on("choice", (choice) => {
    console.log(`Received choice from user (${clientIpAddress}): ${choice}`);
    io.emit("choice", { ipAddress: clientIpAddress, choice });
  });

  socket.on("disconnect", () => {
    console.log(`A user disconnected. IP: ${clientIpAddress}`);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
