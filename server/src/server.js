const express = require("express");
const cors = require("cors");

const { connect } = require("./config/db.config");
const {
  router: parkingController,
} = require("./controllers/parking.controller");
const { router: adminController } = require("./controllers/admin.controller");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  app.set("socket", socket);
});

app.use("/admin", adminController);
app.use("/parking", parkingController);

const port = 8000;
const start = async () => {
  await connect();
  server.listen(port, () => {
    console.log(`Database Connected and Server is listening on port ${port}`);
  });
};

module.exports = { start };
