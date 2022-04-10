var express = require('express');
var router = express.Router();
var admin1 = require('../controllers/userController') 
var admin2 = require('../controllers/adminDeviceController')
var topic = require('../controllers/topicController')
var repair = require('../controllers/repairController')
var onclient = require('../controllers/onclientController')

//获取用户所有信息
router.get('/getUsers',admin1.getUserInfo)  
//获取指定id的用户信息
router.get('/getUserById',admin1.getUserInfoById)
//router.get('/userInfoByName',admin.getUserInfoByName)
//注册新用户
router.post('/reguser',admin1.userReg)
//删除用户信息
router.get('/delUserById',admin1.delUserById)
//更改用户信息
router.post('/updateUserById',admin1.updateUserInfoById)

router.get('/getDevInf',admin2.adminGetDevInfo)
//根据设备ID获取
router.get('/getDevInfById',admin2.adminGetDevInfoById)

//查看所有报修信息
router.get('/getRepairInf',repair.getRepairInfo)
//根据状态查看
router.get('/getRepairInfBySta',repair.getRepairInfoBySta)
//增加报修信息
router.post('/addRepairInf',repair.addRepairInfo)
//修改报修信息
router.post('/updateRepairInf',repair.updateRepairInfo)

//查看全部主题
router.get('/getTopics',topic.admingetTopicInfo)

//查看在线的客户端
router.get('/getOnclient',onclient.getOnclient)

module.exports = router;

 