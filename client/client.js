var db= require('../utill/dbconfig')
var express = require('express');
var router = express.Router();
const mqtt = require("mqtt");

const host = "127.0.0.1";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "emqx",
  password: "public",
  reconnectPeriod: 1000,
});




router.get('/client/test',function(req,res){
  res.send('test!')
})


/*


*/

// const topic1 = "user/get/+/+/+";
// const topic2 = "/nodejs/post";
// client.on("connect", () => {
//   console.log("Connected");
//   client.subscribe([topic1], () => {
//     console.log(`Subscribe to topic1 '${topic1}'`);
//   });
// });

// client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
//   console.log("Received Topic:",topic);
//   console.log("Received Message:",payload.toString());
//   var data = JSON.parse(payload.toString());
//   console.log("--------------------------------------------------");
//   console.log(data);
//   const sql = `insert into userdeviceinf(userId,deviceId)values( ${userId},${deviceId})` 
//   db.query()
// });
module.exports = router;