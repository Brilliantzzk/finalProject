const { query } = require("express");
const mosca = require("mosca");
var db= require('../utill/dbconfig')
const MqttServer = new mosca.Server({
  port: 1883
});
MqttServer.on("clientConnected", function(client) {
  //当有客户端连接时的回调.
  console.log("client connected", client.id);
      //定义SQL 语句，查询客户端是否在数据库中
      const sql = `select * from onclient where clientid = '${client.id}'`
      db.query(sql,[],function(result,fields){
        // 判段用户名是否被占用（由于select结果为数组，通过判断数组长度，如果查到，则证明有该用户名，数组长不为0）
        if (result.length > 0) {
           console.log('client已存在')      
           //修改客户端状态
           const sql1 = `UPDATE onclient SET clientSta = 1 where clientid = '${client.id}'`
           db.query(sql1, function (result, fields) {
             if (fields !== undefined && result === null) {
               console.log('修改成功！')
             } else {
               console.log('修改失败！')
             }
           })//query1       
        }else{    
            //在线客户端存入数据库
            const sql2 = `INSERT INTO onclient VALUES( '${client.id}',1)`
            db.query(sql2, function (result, fields) {
              if (fields !== undefined && result === null) {
                console.log('存入成功！')
              } else {
                console.log('存入失败！')
              }
            })//query2  
        }//else      

})//query
});//clientConnected

MqttServer.on("clientDisconnected", function(client) {
    //当有客户端断开连接时的回调.
    console.log("client Disconnected", client.id);
      //修改客户端状态
      const sql2 = `UPDATE onclient SET clientSta = 0 where clientid = '${client.id}'`
      db.query(sql2, function (result, fields) {
        if (fields !== undefined && result === null) {
          console.log('修改成功！')
        } else {
          console.log('修改失败！')
        }
      })//query
     
  });//clientConnected



/**
 * 监听MQTT主题消息
 * 当客户端有连接发布主题消息时
 **/
//packet :
MqttServer.on("published", function(packet, client) {
  var topic = packet.topic;
  switch (topic) {
    case "WIFI/connect":
      console.log('message-publish', packet.payload.toString());
      //MQTT可以转发主题消息至其他主题
      //MqttServer.publish({ topic: 'other', payload: 'sssss' });
      break;
    case "other":
      console.log("message-123", packet.payload.toString());
      break;
  }
});

MqttServer.on("ready", function() {
  //当服务开启时的回调
  console.log("mqtt is running...");
});

