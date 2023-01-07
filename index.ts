import { Application, Request, Response } from "express";
import * as bodyParser from "body-parser";

const express = require("express");
const cors = require("cors");
const app: Application = express();
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

    const serviceDetailsCollection = client
      .db("keyFirm")
      .collection("servicesCollection");

    const usersCollection = client.db("keyFirm").collection("users");

    //get serviceNameCollection
    app.get("/names", async (req: Request, res: Response) => {
      let query = {};
      const cusor = serviceNameCollection.find(query);
      const reviews = await cusor.toArray();
      res.send(reviews);
    });

    //Add users
    app.post("/users", async (req: Request | bodyParser, res: Response) => {
      const user = req.body;
      console.log("ok2", user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    //get serviceNameCollection
    app.get("/project", async (req: Request, res: Response) => {
      let query = {};
      const cusor = serviceDetailsCollection.find(query);
      const reviews = await cusor.toArray();
      res.send(reviews);
    });

    //get all-Collection
    app.get("/", async (req: Request, res: Response) => {
      let query = {};
      const cusor = serviceDetailsCollection.find(query);
      const reviews = await cusor.limit(6).toArray();
      res.send(reviews);
    });

    //get all-Collection Services
    app.get("/services", async (req: Request, res: Response) => {
      let query = {};
      const cusor = serviceDetailsCollection.find(query);
      const reviews = await cusor.toArray();
      res.send(reviews);
    });

    //get home serviceDetailsCollection
    app.get("/home/:name", async (req: Request, res: Response) => {
      const name = req.params.name;

      const query = { name: name };
      const orders = await serviceDetailsCollection
        .find(query)
        .limit(6)
        .toArray();

      res.send(orders);
    });

    //get Details of Collection
    app.get("/details/:id", async (req: Request, res: Response) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const orders = await serviceDetailsCollection.find(query).toArray();

      res.send(orders);
    });

    //get serviceDetailsCollection
    app.get("/services/:name", async (req: Request, res: Response) => {
      const name = req.params.name;

      const query = { name: name };
      const orders = await serviceDetailsCollection
        .find(query)
        .limit(6)
        .toArray();

      res.send(orders);
    });

    //get checkout collections
    app.get("/checkout/:id", async (req: Request, res: Response) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const payment = await serviceDetailsCollection.findOne(query);
      res.send(payment);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

app.get("/", (req: Request, res: Response) => {
  res.send("this server is running");
});

app.listen(port, () => {
  console.log("server is 5000");
});
