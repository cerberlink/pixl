var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/elements.html"));
});

module.exports = router;

