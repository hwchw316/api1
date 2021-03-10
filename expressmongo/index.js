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
  let db = await MongoUtil.connect(mongoUrl, "Donki_Database");
  console.log("Database up and running");


  // POST 
  app.post("/add_user", async (req, res) => {
    let userid = req.body.userid;
    let email = req.body.email;
    try {
      let result = await db.collection("users").insertOne({
        'userid': userid,
        'email': email
      });
      res.status(200);
      res.send(result.ops[0]);
    } catch (e) {
      res.status(500);
      res.send({
        message: "Sia la, unable to insert data."
      });
      console.log(e);
    }
  });
}
main();
// RUN SERVER
app.listen(3001, () => {
  console.log("Server has started");
});