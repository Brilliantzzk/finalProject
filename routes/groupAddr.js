var express = require('express');
var router = express.Router();
var groupAddr = require('../controllers/groupAddrController')

router.get('/getGroupInf',groupAddr.GetGroupInfo)
module.exports = router;