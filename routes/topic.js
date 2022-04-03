var express = require('express');
var router = express.Router();
var topic = require('../controllers/topicController')

router.get('/getTopics',topic.getTopicInfo)
router.post('/addTopic',topic.addTopicInfo)
module.exports = router;