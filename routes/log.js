var express = require('express');
var router = express.Router();
var log = require('../controllers/logController')

router.get('/getLogs',log.getLogInfo);
module.exports = router;