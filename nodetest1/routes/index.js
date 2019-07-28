var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET IPv4 page. */
router.get('/getip', function(req, res) {
  res.render('getip', { ipv4address: "ipv4" });
});

module.exports = router;
