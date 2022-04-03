var express = require('express');
var router = express.Router();
var admindevice = require('../controllers/adminDeviceController') 
var userdevice = require('../controllers/userDeviceController')

router.get('/getUserDev',admindevice.getUserDeviceInfo)
router.post('/addDev',admindevice.addDevice)
router.post('/updateDevById',admindevice.updateDevice)
router.post('/deleteDevById',admindevice.delDevInfoById)
router.get('/getDev',userdevice.getDevInfo) 
router.get('/getDevById',userdevice.getDevInfoById)
router.post('/addUserDev',userdevice.addDevice)
router.post('/delUserDev',userdevice.delDevInfoById)

module.exports = router;
 