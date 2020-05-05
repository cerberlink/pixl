var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});


var response;

var model = {
  element: "",
  update: function (e) {
    this.element = e;
    view.render();
  },
};

var view = {
  render: function () {
    response.render("element", {
      layout: false,
      element: model.element
    });
  },
};
router.get("/mg", function (req, res) {
  response = res;
  model.update("Mg");
});

router.get("/al", function (req, res) {
  response = res;
  model.update("Al");
  // res.send("GET request for Al");
});

router.get("/ca", function (req, res) {
  response = res;
  model.update("Ca");
});

router.get("/ti", function (req, res) {
  response = res;
  model.update("Ti");
});

router.get("/fe", function (req, res) {
  response = res;
  model.update("Fe");
});

router.get("/si", function (req, res) {
  response = res;
  model.update("Si");
});

/* var handlebars = require('express-handlebars');
router.set("view engine", "html");
router.engine(
  "html",
  handlebars({
    layouts: `${__dirname}/views/`,
    extname: "html",
  })
);

var response;

var model = {
  element: "",
  update: function (e) {
    this.element = e;
    view.render();
  },
};

var view = {
  render: function () {
    response.render("element", {
      layout: false,
      element: model.element
    });
  },
};

router.use(express.static(__dirname));
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/myapp/views/index.html"));
});

router.get("/mg", function (req, res) {
  response = res;
  model.update("Mg");
});

router.get("/al", function (req, res) {
  response = res;
  model.update("Al");
  // res.send("GET request for Al");
});

router.get("/ca", function (req, res) {
  response = res;
  model.update("Ca");
});

router.get("/ti", function (req, res) {
  response = res;
  model.update("Ti");
});

router.get("/fe", function (req, res) {
  response = res;
  model.update("Fe");
});

router.get("/si", function (req, res) {
  response = res;
  model.update("Si");
}); */

module.exports = router;