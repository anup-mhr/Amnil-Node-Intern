import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  //   const userId = socket.handshake.query.userId;
  //   if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  //   io.emit("getOnlineUsers", Object.keys(userSocketMap));

  io.on("joinUser", () => {
    io.to("room1").emit("userJoined", socket.id);
  });

  io.on("sendMessage", (message) => {
    io.to("room1").emit("receiveMessage", message);
  });

  socket.on("disconnect", async () => {
    console.log("user disconnected", socket.id);

    const sockets = await io.in("room1").fetchSockets();
    io.to("room1").emit("onlineUsers", sockets);
  });
});

export { app, io, server };
