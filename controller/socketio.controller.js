const jwt = require("jsonwebtoken");

async function Chat(req, res) {
  const users = await getUserFromToken(req.headers, process.env.SECRET_KEY);
  console.log(users);

  try {
    io.on("connect", (socket) => {
      console.log("user conected");
      socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
      });
    });
  } catch (error) {
    console.log(error);
    let resp = ResponseTemplate(null, "internal server error", null, 500);
    res.json(resp);
    return;
  }
}

module.exports = { Chat };
