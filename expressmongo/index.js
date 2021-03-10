const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoUtil = require("./MongoUtil");
const ObjectId = require("mongodb").ObjectId;

const mongoUrl = process.env.MONGO_URL;

// Create Express & enable JSON, CORS
let app = express();
app.use(express.json());
app.use(cors());

// test route
async function main() {
  let db = await MongoUtil.connect(mongoUrl, "DonDonDonki");
  console.log("Database up and running");
}

main();

// RUN SERVER
app.listen(3001, () => {
  console.log("Server has started");
});