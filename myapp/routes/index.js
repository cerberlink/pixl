var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();

router.use("/mg", require("./element.js"));
router.use("/al", require("./element.js"));
router.use("/ca", require("./element.js"));
router.use("/ti", require("./element.js"));
router.use("/fe", require("./element.js"));
router.use("/si", require("./element.js"));

router.use("/about", require("./about.js"));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
