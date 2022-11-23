const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa_19110441:19110441@cluster0.eicusms.mongodb.net/Nasa_19110441?retryWrites=true&w=majority";

const mongooseConnect = () => mongoose.connect(MONGO_URL);

const mongooseDisconnect = () => mongoose.disconnect();

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

module.exports = {
  mongooseConnect,
  mongooseDisconnect,
};
