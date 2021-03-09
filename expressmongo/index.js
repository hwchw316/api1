const express = require("express");
const cors = require("cors");
require("dotenv/types").config();
const Connectmongo = require("./connectmongo");
const ObjectId = require("mongodb").ObjectId;

const MONGODATABASEURL = process.env.MONGODATABASEURL;

// Create Express & enable JSON, CORS
let app = express();
app.use(express.json());
app.use(cors());

// test route
async function main() {
  let db = await Connectmongo.connect(mongoUrl, "DonDonDonki");
  console.log("Database up and running");
}