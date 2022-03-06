const express = require("express");
const app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get((req, res, next) => {
  let string = `${req.path} && ${req.method}`;
  console.log(string);
  next();
});

app.get("/api", (req, res) => {
  let string = `${req.path} && ${req.method}`;
  console.log(string);
  let obj = {
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  };
  res.json(obj);
});
app.get(
  "/api/:date",
  (req, res, next) => {
    let date;
    if (+req.params.date) {
      req.params.date = new Date(+req.params.date);
    } else {
      req.params.date = new Date(req.params.date);
    }
    next();
  },
  function (req, res) {
    let string = `${req.path} && ${req.method}`;
    console.log(string);
    let date = req.params.date;
    let obj = {};
    if (date.toUTCString() !== "Invalid Date")
      obj = {
        unix: date.getTime(),
        utc: date.toUTCString(),
      };
    else
      obj = {
        error: "Invalid Date",
      };
    res.json(obj);
  }
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
