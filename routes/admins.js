var express = require('express');
var router = express.Router();
var admin = require('../controllers/userController') 

//获取用户所有信息
router.get('/getUsers',admin.getUserInfo)  
//获取指定id的用户信息
router.get('/getUserById',admin.getUserInfoById)
//router.get('/userInfoByName',admin.getUserInfoByName)
//注册新用户
router.post('/reguser',admin.userReg)
//删除用户信息
router.post('/deleteUserById',admin.delUserInfoById)
//更改用户信息
router.post('/updateUserById',admin.updateUserInfoById)

module.exports = router;
 