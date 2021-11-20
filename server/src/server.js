let express = require("express");

let { connect } = require("./config/db.config");
let { router: parkingController } = require("./controllers/parking.controller");
let { router: adminController } = require("./controllers/admin.controller");

let app = express();
app.use(express.json());

app.use("/admin", adminController);
app.use("/parking", parkingController);

let port = 8000;
const start = async () => {
  await connect();
  app.listen(port, () => {
    console.log(`Database Connected and Server is listening on port ${port}`);
  });
};

module.exports = { start };
