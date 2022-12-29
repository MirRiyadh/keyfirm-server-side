const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middle cors
app.use(cors());
app.use(express.json());

const user = process.env.USER_NAME;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${user}:${password}@cluster0.8u18gdj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceNameCollection = client
      .db("keyFirm")
      .collection("servicesName");

    //get api reviews
    app.get("/names", async (req, res) => {
      const decoded = req.decoded;
      let query = {};
      const cusor = serviceNameCollection.find(query);
      const reviews = await cusor.toArray();
      res.send(reviews);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("this server is running");
});

app.listen(port, () => {
  console.log("server is 5000");
});
