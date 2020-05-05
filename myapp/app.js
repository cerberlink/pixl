var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//To use a router from Controller in main app file
//and then call use() to add the Router to the middleware handling path
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var elementRouter = require("./routes/elements");
var mgRouter = require("./routes/mg");
var alRouter = require("./routes/al");
var caRouter = require("./routes/ca");
var tiRouter = require("./routes/ti");
var feRouter = require("./routes/fe");
var siRouter = require("./routes/si");

var app = express();

/*
// a callback route handler function for HTTP GET request to the site root ('/')
app.get("/", function (req, res) {
  res.send("Hello World!");
});
*/

//app.all("/secret", function (req, res, next) {
//console.log("Accessing the secret section ...");
//next(); // pass control to the next handler
//});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/stylesheets"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "elements.html"));
  //It will find and locate index.html from View or Scripts
});

/*
app.get("/", function (req, res) {
  res.sendFile(path.join(_dirname + "/heatmap.html"));
});

app.get("/elements", function (req, res) {
  res.sendFile(path.join(_dirname + "/elements.html"));
});
*/

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Those routes are accessible from /home/ or /home/heatmap
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/elements", elementRouter);
app.use("/mg", mgRouter);
app.use("/al", alRouter);
app.use("/ca", caRouter);
app.use("/ti", tiRouter);
app.use("/fe", feRouter);
app.use("/si", siRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
