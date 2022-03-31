var express = require('express');
var router = express.Router();
var device = require('../controllers/deviceController') 

router.get('/getDev',device.getDevInfo) 
router.get('/getDevById',device.getDevInfoById)
router.post('/addDev',device.addDevice)
router.post('/updateDevById',device.updateDevice)
router.post('/deleteDevById',device.delDevInfoById)

module.exports = router;
 