require("dotenv").config();

const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const router = require("./routes/route");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

const { ResponseTemplate } = require("./helper/template.helper");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

const dataUsers = [];

io.use((socket, next) => {
  const token = socket.handshake.headers.authorization;
  console.log(socket.handshake.headers.authorization);

  if (!token) {
    return next(new Error("Authentication error: Token not provided"));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(new Error("Authentication error: Invalid token"));
    }

    // Menggabungkan informasi pengguna ke objek socket
    socket.user = user;
    dataUsers.push(socket.user);
    console.log(socket.user);
    next();
  });
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.email}`);
  // Membuat room ID unik berdasarkan dua ID pengguna
  const room = dataUsers[0].email;
  console.log(`room ${room}`);

  socket.join(room);

  if (dataUsers[1] === undefined) {
    return;
  }

  const anu = `anu-${dataUsers[0].email}-${dataUsers[1].email}`;
  console.log(anu);


  socket.on(`${anu}`, (data) => {
    const receiverEmail = dataUsers[0].email;
    // console.log(receiverEmail)
    // console.log(`socket.id ${socket.id}`)
    // Mengirim pesan hanya ke pengguna yang dituju
    io.to(receiverEmail).emit(`${anu}`, data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.email}`);
  });
});

// io.on('connect', (socket) => {
//   console.log(`User connected: ${socket.user.email}`);
//   const auth = `data-${socket.user.id}-${socket.user.id}`
//   console.log(auth)
//   socket.on(auth, (data) => {
//     // io.sockets.emit('chat', {
//     //   sender: socket.user.email,
//     //   message: data,
//     // });

//     io.sockets.emit(auth, data);
//   });

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.user.email}`);
//   });
// });
