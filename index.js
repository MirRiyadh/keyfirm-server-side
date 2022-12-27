const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

const users = require("./data/user.json");

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/user", (req, res) => {
  res.send(users);
});

app.get("/bangi/:id", (req, res) => {
  const id = req.params.id;
  const getId = users.find((xyz) => xyz.id == id);
  res.send(getId);
});

app.listen(port, () => {
  console.log("This server is running on", port);
});
