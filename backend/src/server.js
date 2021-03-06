const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

const app = express();
const server = http.Server(app);
const io = socketio(server);

// req.query = get url query -> ?age=20 (/users?age=20) filters
// req.params = get url params -> :id (/users/1) edit and delete
// req.body = get request body -> {JSON} (/users) create and edit
mongoose.connect(
  "mongodb+srv://omnistack_user:omnistack@omnistack9-r1jlh.mongodb.net/week09?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(3333);
