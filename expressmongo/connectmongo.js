const Connectmongo = require("mongodb").MongoClient;

async function connect(mongoUrl, databaseName) {
  // create a client
  let client = await mongoClient.connect(mongoUrl, {
    useUnifiedTopology: true
  });
  // use a database;
  let db = client.db(databaseName);
  console.log("Database connected");
  return db;
}

// we are exporting the connect function
module.exports = {
    connect
}