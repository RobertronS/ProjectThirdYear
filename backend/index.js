const express = require("express");
const cors = require("cors");
const getData = require("./data");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const data = await getData();
  return res.send(data);
});

app.listen(5000, () => console.log("listening on port 5000"));

module.exports = app;
