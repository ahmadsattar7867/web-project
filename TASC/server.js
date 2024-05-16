const express = require("express");
const Socket = require("socket.io");
const http = require("http");

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
const server = http.createServer(app);

const io = Socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = [];

io.on("connection", socket => {
  socket.on("adduser", username => {
    socket.user = username;
    users.push(username);
    io.sockets.emit("users", users);

    io.to(socket.id).emit("private", {
      id: socket.id,
      name: socket.user,
      msg: "secret message",
    });
  });

  socket.on("message", message => {
    io.sockets.emit("message", {
      message,
      user: socket.user,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.user} is disconnected`);
    if (socket.user) {
      users.splice(users.indexOf(socket.user), 1);
      io.sockets.emit("user", users);
      console.log("remaining users:", users);
    }
  });
});

// Define a route to handle the root path ("/")
app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, hostname, () => {
  console.log(`HTTP server running at http://${hostname}:${port}/`);
});
