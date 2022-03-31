var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')
/* GET users listing. */



//登录
router.post('/login',user.userLogin)

module.exports = router;
