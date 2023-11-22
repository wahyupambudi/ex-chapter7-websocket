require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./routes/route");
const port = process.env.PORT || 3000;
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

io.on("connect", (socket) => {
  console.log("user conected");
  let eventRoom = `chat-${req.user.id}-${req.user.id}`;
  socket.on(eventRoom, (data) => {
    io.sockets.emit(eventRoom, data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
