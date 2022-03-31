var express = require('express');
var router = express.Router();
var topic = require('../controllers/topicController')

router.get('/getTopics',topic.getTopicInfo)
module.exports = router;