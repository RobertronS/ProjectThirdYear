const express = require("express");
const cors = require("cors");
//const getData = require("./data");
const { getData, getDataWithLimits } = require("./data");
const bodyParser = require("body-parser");

const app = express();

//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const data = await getData();
  //return res.send({ hello: "world" });
    return res.send(data);
});

//Here the other server to receive the data from the frontend
app.post("/range", async (req, res) => {
  const { timestamp, timestamp2 } = req.body;
  console.log(timestamp, timestamp2);
  const data = await getDataWithLimits(timestamp, timestamp2);
  return res.send(data);
});

app.listen(5000, () => console.log("listening on port 5000"));

module.exports = app;
