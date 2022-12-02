var express = require('express');
var router = express.Router();






router.get('/', function(req, res) {
  res.send({data:"Hello"});
});






module.exports = router;
// module.exports={Counting}
