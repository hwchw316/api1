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


  // GET - Fetch information
  //https://3001-aquamarine-squirrel-aqecmusb.ws-us03.gitpod.io/read_ingredients
  app.get("/read_ingredients", async (req, res) => {
    let tasks = await db
      .collection("ingredients")
      .find()
      .toArray();
    res.status(200);
    res.send(tasks);
  });


  // POST 
  //https://3001-aquamarine-squirrel-aqecmusb.ws-us03.gitpod.io/add_user
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
        message: "User unable to be added."
      });
      console.log(e);
    }
  });
  // POST 
  //https://3001-aquamarine-squirrel-aqecmusb.ws-us03.gitpod.io/add_ingredients
  app.post("/add_ingredients", async (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let imgurl = req.body.imgurl;
    try {
      let result = await db.collection("ingredients").insertOne({
        'name ': name,
        'price': price,
        'imgurl': imgurl
      });
      res.status(200);
      res.send(result.ops[0]);
    } catch (e) {
      res.status(500);
      res.send({
        message: "Ingredient not being accepted."
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