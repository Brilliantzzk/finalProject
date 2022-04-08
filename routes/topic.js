var express = require('express');
var router = express.Router();
var topic = require('../controllers/topicController')

router.get('/getTopics',topic.getTopicInfo)
router.post('/addTopic',topic.addTopicInfo)
router.post('/delTopic',topic.delTopInfo)
router.post('/updateTopic',topic.updateTopInfo)

module.exports = router;