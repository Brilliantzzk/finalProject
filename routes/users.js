var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')


//登录
router.post('/login',user.userLogin)
module.exports = router;
