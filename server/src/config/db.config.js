const mongoose = require("mongoose");

const uri =
  "mongodb+srv://dheeraj:qwertyqwerty@cluster0.kxiug.mongodb.net/test";

const connect = () => {
  return new mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = { connect };
