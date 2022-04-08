var express = require('express');
var router = express.Router();
var admin = require('../controllers/userController') 
var repair = require('../controllers/repairController')

//获取用户所有信息
router.get('/getUsers',admin.getUserInfo)  
//获取指定id的用户信息
router.get('/getUserById',admin.getUserInfoById)
//router.get('/userInfoByName',admin.getUserInfoByName)
//注册新用户
router.post('/reguser',admin.userReg)
//删除用户信息
router.get('/delUserById',admin.delUserById)
//更改用户信息
router.post('/updateUserById',admin.updateUserInfoById)

//查看所有报修信息
router.get('/getRepairInf',repair.getRepairInfo)
//根据状态查看
router.get('/getRepairInfBySta',repair.getRepairInfoBySta)
//增加报修信息
router.post('/addRepairInf',repair.addRepairInfo)
//修改报修信息
router.post('/updateRepairInf',repair.updateRepairInfo)

module.exports = router;
 