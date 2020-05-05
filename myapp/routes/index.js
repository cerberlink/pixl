var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/mg', require('./element.js'));
router.use('/al', require('./element.js'));
router.use('/ca', require('./element.js'));
router.use('/ti', require('./element.js'));
router.use('/fe', require('./element.js'));
router.use('/si', require('./element.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  //res.sendFile("Test route");
});

router.get('/mg', function(req, res, next){
	res.send("Magnesium route");
})

router.get('/al', function(req, res, next){
	res.send("Aluminum route");
})

router.get('/ca', function(req, res, next){
	res.send("Calcium route");
})

router.get('/ti', function(req, res, next){
	res.send("Titanium route");
})

router.get('/fe', function(req, res, next){
	res.send("Iron route");
})

router.get('/si', function(req, res, next){
	res.send("Silicon route");
})

module.exports = router;
