var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render(path.join(__dirname + "/about.html"));
});

module.exports = router;
