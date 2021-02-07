const express = require("express");
const http = require("http");
const socket = require("socket.io");
const logger = require("morgan");

const app = express();
const server = http.createServer(app);
// noinspection JSValidateTypes
const io = socket(server);

const SOCKET_STORE = {};
const RESPONSE_STORE = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("combined"));

io.on("connection", (socket) => {
  console.log("a user connected ..");
  socket.on("disconnect", () => {
    console.log("user disconnected ..");
  });
});

app.use("/", (req, res) => {
  const { method, params, headers, url: path, baseUrl, query, body } = req;
  const data = { ...headers, ...body, ...query };
  console.log(method, params, headers, path, baseUrl, query, body);
  res.send("OK");
});

server.listen(8080, () => {
  console.log("Server running on port 8080!");
});
