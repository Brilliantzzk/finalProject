var express = require('express');
var router = express.Router();
var data = require('../controllers/dataController')

router.get('/getDatas',data.getDataInfo);
router.get('/getDataById',data.getDataInfoById)
module.exports = router;
