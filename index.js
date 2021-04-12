const express = require("express");
const app = express();
const http = require("http");
const { connect } = require("http2");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnect");
//   });
// });

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });
// });

// io.on("connection", (socket) => {
//   socket.broadcast.emit("hi");
// });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("registUser", (username) => {
    io.emit("registUser", username);
  });
  socket.on("disconnectUser", (username) => {
    io.emit("disconnectUser", username);
  });

  socket.on("chat message", (username, msg) => {
    io.emit("chat message", username, msg);
  });

  socket.on("connect", () => {
    console.log("asdasd");
    io.emit("chat message", "Anonymous", "join the chat!");
  });

  socket.on("disconnect", (a) => {
    console.log("SOMEONE DISCONNECT!");
    io.emit("disconnectUser", null);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
