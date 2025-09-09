const express = require("express");
require("./config/connect");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server work");
});

app.listen(5000, () => {
  console.log("server work");
});
