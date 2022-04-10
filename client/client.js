var db= require('../utill/dbconfig')
var express = require('express');
var router = express.Router();
const mqtt = require("mqtt");
const res = require('express/lib/response');
const { contentDisposition } = require('express/lib/utils');

const resObj = (code,message) => {
  return {
    code: code,
    message: message,
  }
}
const resObj2 = (code,message,data) => {
  return {
    code: code,
    message: message,
    data:data
  }
}



const host = "127.0.0.1";
const port = "1883";
const clientId = `mqtt_admin`;

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000, //两端连接的时间
  // username: "emqx",
  // password: "public",
  reconnectPeriod: 0, //重连间隔
});

//deviceId转Mac地址
function DeviceIdtoMac(deviceId,callback){
  const sql1 = `SELECT macAddr FROM deviceinf where deviceId = ${deviceId} `
  db.query(sql1, [], function (result, fields) {
    if(result!=''){ 
    console.log("数据库查询到的macAddr为:")
    console.log(result[0].macAddr)//获取macAddr 
    var Mac = result[0].macAddr
    console.log("检测赋值结果:")
    console.log(Mac)
    console.log("以上为转换后的")
    callback(Mac) 
  }else{
    console.log('未查到该设备') 
    return 
    }
  })
}
//Mac地址转deviceId
function MactoDeviceId(macAddr,callback){
  const sql1 = `SELECT deviceId FROM deviceinf where macAddr = '${macAddr}' `
  db.query(sql1, [], function (result, fields) {
    if(result!=''){ 
    console.log("数据库查询到的deviceId为:")
    console.log(result[0].deviceId)//获取deviceId
    var deviceId = result[0].deviceId
    console.log("检测赋值结果:")
    console.log(deviceId)
    callback(deviceId) 
  }else{
    console.log('未查到该设备') 
    return 
    }
  })
}

//订阅主题
const topic1 = "+/getdata";
const topic2 = "+/connect";

client.on("connect", () => {
  console.log("Connected");
  client.subscribe([topic1], () => {
    console.log(`Subscribe to topic1 '${topic1}'`);
  });
  client.subscribe([topic2], () => {
    console.log(`Subscribe to topic2 '${topic2}'`);
  });
});

//获取信息并存入数据库（测试中）

client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
  console.log("Received Topic:",topic);
  console.log("Received Message:",payload.toString());
  console.log("-------------截取topic--------------------");
  console.log(topic.indexOf('g'))
  console.log(topic.substr(topic.indexOf('g')))
  console.log("-------------截取topic--------------------");
   if(topic.substr(topic.indexOf('g')) == 'getdata'){//判断存入的主题
  var str = JSON.parse(payload.toString()); //str为json类型
  console.log("-------------检测payload是否转换成了json格式--------------------");
  console.log(str);
  console.log("----从payload中读取的结果 topic 数据和MAC地址--------");
  console.log(topic);
  console.log(str.Mac);  //获取了json指定内容  json.字段名
  console.log("----以下为检测转换后给sql的格式--------");
  MactoDeviceId(str.Mac,function(id){
    console.log("----检测转换结果--------");
    console.log(id)
//判断是否有温度字段以此来存入数据库
  if(str.recv_fail == undefined){
    if(str.Tem ==undefined){
      console.log(str.Tem);//获取温度
      console.log("没有")
    }else{
      console.log(str.Tem);//获取温度
      console.log("有")
      var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
      //定义sql语句来存入appdata数据库(未实现)
      const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'温度','${str.Tem}','${date1}')`
      db.query(sql1, function (result, fields) {
        if (fields !== undefined && result === null) {
          console.log('添加成功')
        } else {
         console.log('添加失败')
        }
    })
}
 //判断是否有湿度字段以此来存入数据库
 if(str.Hum ==undefined){
  console.log(str.Hum);//获取湿度
  console.log("没有")
}else{
  console.log(str.Hum);//获取湿度
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'湿度','${str.Hum}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}//else
 //判断是否有烟雾浓度字段以此来存入数据库
 if(str.Smoke ==undefined){
  console.log(str.Smoke);//获取烟雾浓度
  console.log("没有")
}else{
  console.log(str.Smoke);//获取烟雾浓度
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'烟雾浓度','${str.Smoke}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}//else
//判断是否有火焰值字段以此来存入数据库
if(str.fire ==undefined){
  console.log(str.fire);//获取烟雾浓度
  console.log("没有")
}else{
  console.log(str.fire);//获取烟雾浓度
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'火焰值','${str.fire}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}//else
//判断是否有粉尘浓度字段以此来存入数据库
if(str.PM ==undefined){
  console.log(str.PM);//获取烟雾浓度
  console.log("没有")
}else{
  console.log(str.PM);//获取烟雾浓度
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'粉尘浓度','${str.PM}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}//else
//判断是否有RLED字段以此来存入数据库
if(str.Rled ==undefined){
  console.log(str.Rled);//获取烟雾浓度
  console.log("没有")
}else{
  console.log(str.Rled);//获取烟雾浓度
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'Rled','${str.Rled}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}

//判断是否有GLED字段以此来存入数据库
if(str.Gled ==undefined){
  console.log(str.Gled);//获取烟雾浓度
  console.log("没有")
}else{
  console.log(str.Gled);//获取烟雾浓度
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'Gled','${str.Gled}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}

//判断是否有BLED字段以此来存入数据库
if(str.Bled ==undefined){
  console.log(str.Bled);//获取烟雾浓度
  console.log("没有")
}else{
  console.log(str.Bled);//获取烟雾浓度
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'Bled','${str.Bled}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}//else
//判断是否有光敏LED字段以此来存入数据库
if(str.Iled ==undefined){
  console.log(str.Iled);//获取光敏LED
  console.log("没有")
}else{
  console.log(str.Iled);//获取光敏LED
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'光敏Led','${str.Iled}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}//else
//判断是否有光敏窗帘字段以此来存入数据库
if(str.ICurtain ==undefined){
  console.log(str.ICurtain);//获取光敏窗帘
  console.log("没有")
}else{
  console.log(str.ICurtain);//获取光敏窗帘
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'光敏窗帘','${str.ICurtain}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}//else
//判断是否有窗帘字段以此来存入数据库
if(str.Curtain ==undefined){
  console.log(str.Curtain);//获取光敏窗帘
  console.log("没有")
}else{
  console.log(str.Curtain);//获取光敏窗帘
  console.log("有")
  var date1 = new Date().toLocaleString()//将当前时间保存为初始值并转换为本地时间
  //定义sql语句来存入appdata数据库(未实现)
  const sql1 = `insert into appdatainf(deviceId,appName,data,dataTime)values(${id},'窗帘','${str.Curtain}','${date1}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      console.log('添加成功')
    } else {
     console.log('添加失败')
    }
})
}//else

} //fecv_fail 
  else{
    console.log('错误')
  }
})
  //res.send(resObj(200,str));
}//if
});//client


//发布通过MAC地址获取设备读取数据信息主题
router.post('/getDataByMac',function(req,res){
  let {topic,deviceId,GetData} = req.body
  DeviceIdtoMac(deviceId,function(data){
 //拼接为json格式
  var strMac1 = '{"Mac":"'
  var strMac2 = '",'
  var strCon1 = '"GetData":"'
  var strCon2 = '"}'
  var message = strMac1+data+strMac2+strCon1+GetData+strCon2 //payload中传入的值
  console.log(message)
  //测试是否拼接成功
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
      console.log("读取数据发布成功")
    }
  })
  //获取消息并显示
  client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
    console.log("Received Topic:",topic);
    console.log("Received Message:",payload.toString());
    console.log("-------------截取topic--------------------");
    console.log(topic.indexOf('g'))
    console.log(topic.substr(topic.indexOf('g')))
    console.log("-------------截取topic--------------------");
    var cuttopic = topic.substr(topic.indexOf('g'))
    console.log(cuttopic)
     if(topic.substr(topic.indexOf('g')) == 'getdata'){
      var str = JSON.parse(payload.toString()); //str为json类型 
      if(str.recv_fail ==undefined){
        res.send(resObj2(200,'success!',str));
      }else{
        res.send(resObj2(201,'fail!',[]));
      }
      
    }//if
  });//on
  })//DeviceIdtoMac
  
})

//发布通过MAC地址控制窗帘主题
router.post('/conCurByMac',function(req,res){
  let {topic,deviceId,Curtain} = req.body
  DeviceIdtoMac(deviceId,function(data){
  console.log(data)
  console.log("--------------------")
  //拼接为json格式
  var strMac1 = '{"Mac":"'
  var strMac2 = '",'
  var strCon1 = '"Curtain":"'
  var strCon2 = '"}'
  var message = strMac1+data+strMac2+strCon1+Curtain+strCon2
  console.log(message)
  //测试是否拼接成功(不用管)
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
     console.log("控制窗帘发布成功")
    }
  })
  //获取消息并显示
  client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
    console.log("Received Topic:",topic);
    console.log("Received Message:",payload.toString());
    console.log("-------------截取topic--------------------");
    console.log(topic.indexOf('g'))
    console.log(topic.substr(topic.indexOf('g')))
    console.log("-------------截取topic--------------------");
    var cuttopic = topic.substr(topic.indexOf('g'))
    console.log(cuttopic)
     if(topic.substr(topic.indexOf('g')) == 'getdata'){
      var str = JSON.parse(payload.toString()); //str为json类型 
      if(str.recv_fail ==undefined){
        res.send(resObj2(200,'success!',str));
      }else{
        res.send(resObj2(201,'fail!',[]));
      }       
    }//if
  });//on 
  })//DeviceIdtoMac
    
})

//发布通过MAC地址获取LED状态(g为获取)
router.post('/getLedByMac',function(req,res){
  let {topic,deviceId,Rled,Gled,Bled} = req.body
  DeviceIdtoMac(deviceId,function(data){
  console.log(data)
  console.log("Rled的值")
  console.log(Rled)
  console.log("Gled的值")
  console.log(Gled)
  console.log("Bled的值")
  console.log(Bled)
  //获取三个灯
  if(Rled == 'g'&& Gled == 'g'&& Bled == 'g'){
  //拼接为json格式
  var strMac1 = '{"Mac":"'
  var strMac2 = '",'
  var strRled1 = '"Rled":"'
  var strRled2 = '",'
  var strGled1 = '"Gled":"'
  var strGled2 = '",'
  var strBled1 = '"Bled":"'
  var strBled2 = '"}'
  var message = strMac1+data+strMac2+strRled1+Rled+strRled2+strGled1+Gled+strGled2+strBled1+Bled+strBled2
  console.log(message)
  }
  //如果仅获取一个灯（Rled）
  else if(Rled == 'g'&& Gled != 'g'&& Bled != 'g'){
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '"}'
    var message = strMac1+data+strMac2+strRled1+Rled+strRled2
    console.log(message)
  }   
  //如果仅获取一个灯（Gled）
  else if(Rled != 'g'&& Gled == 'g'&& Bled != 'g'){
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '"}'
    var message = strMac1+data+strMac2+strGled1+Gled+strGled2
    console.log(message)
  }
  //如果仅获取一个灯（Bled）
  else if(Rled != 'g'&& Gled != 'g'&& Bled == 'g'){
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+data+strMac2+strBled1+Bled+strBled2
    console.log(message)
  }
  //如果获取两个灯（Rled,Gled）
  else if(Rled == 'g'&& Gled == 'g'&& Bled != 'g'){
    //拼接为json格式
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '"}'
    var message = strMac1+data+strMac2+strRled1+Rled+strRled2+strGled1+Gled+strGled2
    console.log(message)
  }  
  //如果获取两个灯（Rled,Bled）
  else if(Rled == 'g'&& Gled != 'g'&& Bled == 'g'){
    //拼接为json格式
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+data+strMac2+strRled1+Rled+strRled2+strBled1+Bled+strBled2
    console.log(message)
  } 
  //如果获取两个灯（gled,Bled）
  else if(Rled != 'g'&& Gled == 'g'&& Bled == 'g'){
    //拼接为json格式
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+data+strMac2+strGled1+Gled+strGled2+strBled1+Bled+strBled2
    console.log(message)
  }          
  //测试是否拼接成功
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
      console.log("获取LED状态发布成功")
    }
  })
        //获取消息并显示
        client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
          console.log("Received Topic:",topic);
          console.log("Received Message:",payload.toString());
          console.log("-------------截取topic--------------------");
          console.log(topic.indexOf('g'))
          console.log(topic.substr(topic.indexOf('g')))
          console.log("-------------截取topic--------------------");
          var cuttopic = topic.substr(topic.indexOf('g'))
          console.log(cuttopic)
           if(topic.substr(topic.indexOf('g')) == 'getdata'){
            var str = JSON.parse(payload.toString()); //str为json类型 
            if(str.recv_fail ==undefined){
              res.send(resObj2(200,'success!',str));
            }else{
              res.send(resObj2(201,'fail!',[]));
            }       
          }//if
        });//on  
  })//DeviceIdtoMac

})

//发布通过MAC地址控制LED灯(3个值1 0 -1 1开 0关 -1不操作)
router.post('/conLedByMac',function(req,res){
  let {topic,deviceId,Rled,Gled,Bled} = req.body
  DeviceIdtoMac(deviceId,function(data){
  console.log(data)
  console.log("Rled的值")
  console.log(Rled)
  console.log("Gled的值")
  console.log(Gled)
  console.log("Bled的值")
  console.log(Bled)
  //如果控制三个灯
  if(Rled != '-1'&& Gled != '-1'&& Bled != '-1'){
  //拼接为json格式
  var strMac1 = '{"Mac":"'
  var strMac2 = '",'
  var strRled1 = '"Rled":"'
  var strRled2 = '",'
  var strGled1 = '"Gled":"'
  var strGled2 = '",'
  var strBled1 = '"Bled":"'
  var strBled2 = '"}'
  var message = strMac1+data+strMac2+strRled1+Rled+strRled2+strGled1+Gled+strGled2+strBled1+Bled+strBled2
  console.log(message)
  }
  //如果仅有一个灯（Rled）
  else if(Rled != '-1'&& Gled == '-1'&& Bled == '-1'){
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '"}'
    var message = strMac1+data+strMac2+strRled1+Rled+strRled2
    console.log(message)
  }   
  //如果仅有一个灯（Gled）
  else if(Rled == '-1'&& Gled != '-1'&& Bled == '-1'){
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '"}'
    var message = strMac1+data+strMac2+strGled1+Gled+strGled2
    console.log(message)
  }
  //如果仅有一个灯（Bled）
  else if(Rled == '-1'&& Gled == '-1'&& Bled != '-1'){
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+data+strMac2+strBled1+Bled+strBled2
    console.log(message)
  }
  //如果有两个灯（Rled,Gled）
  else if(Rled != '-1'&& Gled != '-1'&& Bled == '-1'){
    //拼接为json格式
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '"}'
    var message = strMac1+data+strMac2+strRled1+Rled+strRled2+strGled1+Gled+strGled2
    console.log(message)
  }  
  //如果有两个灯（Rled,Bled）
  else if(Rled != '-1'&& Gled == '-1'&& Bled != '-1'){
    //拼接为json格式
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+data+strMac2+strRled1+Rled+strRled2+strBled1+Bled+strBled2
    console.log(message)
  } 
  //如果有两个灯（gled,Bled）
  else if(Rled == '-1'&& Gled != '-1'&& Bled != '-1'){
    //拼接为json格式
    var strMac1 = '{"Mac":"'
    var strMac2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+data+strMac2+strGled1+Gled+strGled2+strBled1+Bled+strBled2
    console.log(message)
  }          
  //测试是否拼接成功
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
      console.log("控制LED灯发布成功")
    }
  })
  })     
  //获取消息并显示
  client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
    console.log("Received Topic:",topic);
    console.log("Received Message:",payload.toString());
    console.log("-------------截取topic--------------------");
    console.log(topic.indexOf('g'))
    console.log(topic.substr(topic.indexOf('g')))
    console.log("-------------截取topic--------------------");
    var cuttopic = topic.substr(topic.indexOf('g'))
    console.log(cuttopic)
     if(topic.substr(topic.indexOf('g')) == 'getdata'){
      var str = JSON.parse(payload.toString()); //str为json类型 
      if(str.recv_fail ==undefined){
        res.send(resObj2(200,'success!',str));
      }else{
        res.send(resObj2(201,'fail!',[]));
      }       
    }//if
  });//on   
})

//发布通过MAC地址启动光敏窗帘主题
router.post('/conICurtain',function(req,res){
  let {topic,deviceId,ICurtain} = req.body
  DeviceIdtoMac(deviceId,function(data){
  console.log(data)
  console.log("--------------------")
  //拼接为json格式
  var strMac1 = '{"Mac":"'
  var strMac2 = '",'
  var strCon1 = '"ICurtain":"'
  var strCon2 = '"}'
  var message = strMac1+data+strMac2+strCon1+ICurtain+strCon2
  console.log(message)
  //测试是否拼接成功(不用管)
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
      console.log("启动光敏窗帘发布成功")
    }
  })
  })//DeviceIdtoMac  
  //获取消息并显示
  client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
    console.log("Received Topic:",topic);
    console.log("Received Message:",payload.toString());
    console.log("-------------截取topic--------------------");
    console.log(topic.indexOf('g'))
    console.log(topic.substr(topic.indexOf('g')))
    console.log("-------------截取topic--------------------");
    var cuttopic = topic.substr(topic.indexOf('g'))
    console.log(cuttopic)
     if(topic.substr(topic.indexOf('g')) == 'getdata'){
      var str = JSON.parse(payload.toString()); //str为json类型 
      if(str.recv_fail ==undefined){
        res.send(resObj2(200,'success!',str));
      }else{
        res.send(resObj2(201,'fail!',[]));
      }       
    }//if
  });//on    
})

//发布通过MAC地址启动光敏LED主题
router.post('/conILed',function(req,res){
  let {topic,deviceId,Iled} = req.body
  DeviceIdtoMac(deviceId,function(data){
  console.log(data)
  console.log("--------------------")
  //拼接为json格式
  var strMac1 = '{"Mac":"'
  var strMac2 = '",'
  var strCon1 = '"Iled":"'
  var strCon2 = '"}'
  var message = strMac1+data+strMac2+strCon1+Iled+strCon2
  console.log(message)
  //测试是否拼接成功(不用管)
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
      console.log("启动光敏LED发布成功")
    }
  })
  //获取消息并显示
  client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
    console.log("Received Topic:",topic);
    console.log("Received Message:",payload.toString());
    console.log("-------------截取topic--------------------");
    console.log(topic.indexOf('g'))
    console.log(topic.substr(topic.indexOf('g')))
    console.log("-------------截取topic--------------------");
    var cuttopic = topic.substr(topic.indexOf('g'))
    console.log(cuttopic)
     if(topic.substr(topic.indexOf('g')) == 'getdata'){
      var str = JSON.parse(payload.toString()); //str为json类型 
      if(str.recv_fail ==undefined){
        res.send(resObj2(200,'success!',str));
      }else{
        res.send(resObj2(201,'fail!',[]));
      }       
    }//if
  });//on     
  })//DeviceIdtoMac
  
})

//判断设备连入（订阅后存入数据库并发布一个主题）
client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
  console.log("Received Topic:",topic);
  console.log("Received Message:",payload.toString());
  if(topic == "WIFI/connect"||topic == "BLE/connect"||topic == "LORA/connect"||topic == "NB/connect"){
    var str = JSON.parse(payload.toString()); //str为json类型 
    console.log(str)
    //存入deviceInf表
    const sql1 = `insert into deviceinf(macAddr,deviceSta,net)values( '${str.Mac}',1,'${str.net}')`
    db.query(sql1, function (result, fields) {
      if (fields !== undefined && result === null) {
        console.log('添加成功')
      } else {
       console.log('添加失败')
      }
  })//query
    //发布reconnect
    var topic3 = str.net+'/reconnect'
    console.log(topic3)
    var message = '{"reconnect":"1"}'
    //发布
    client.publish(topic3, message, (error) => {
      if (error) {
        console.error(error)
      }else{
        console.log("确认已发送")
      }
    })//publish
  }//if
});

//将设备添加至组内
router.post('/addDevToGro',function(req,res){
  let {topic,groupAddr,deviceId,Sub} = req.body
  DeviceIdtoMac(deviceId,function(data){
  console.log(data)
  console.log("--------------------")
  //拼接为json格式
  var strMac1 = '{"Mac":"'
  var strMac2 = '",'
  var strSub1 = '"Sub":"'
  var strSub2 = '",'
  var strGro1 = '"GroupId":"'
  var strGro2 = '"}'
  var message = strMac1+data+strMac2+strSub1+Sub+strSub2+strGro1+groupAddr+strGro2
  console.log(message)
  //测试是否拼接成功(不用管)
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
     console.log("组地址发布成功")
     //存入sql
     const sql1 = `INSERT INTO groupinf VALUES('${groupAddr}',${deviceId})`
     db.query(sql1, function (result, fields) {
      console.log(result);
      console.log(fields); 
      if (fields !== undefined && result === null) {
         const sql2 =  `SELECT * FROM groupinf where groupAddr = '${groupAddr}' and deviceId = ${deviceId}`
         db.query(sql2, [], function(result2, fields2){
           if (result2 !== null) {   
             console.log(result2)
             res.send(resObj2(200,result2,'添加成功'))
           } 
         })
       } else {
         res.send(resObj2(201,[], '增加失败'));
       }
     })
    }
  })//publish
  
})//DeviceIdtoMac
    
})

//发布通过组地址控制窗帘主题
router.post('/conCurByGro',function(req,res){
  let {topic,GroupId,Curtain} = req.body
  console.log(GroupId)
  console.log("--------------------")
  //拼接为json格式
  var strMac1 = '{"GroupId":"'
  var strMac2 = '",'
  var strCon1 = '"Curtain":"'
  var strCon2 = '"}'
  var message = strMac1+GroupId+strMac2+strCon1+Curtain+strCon2
  console.log(message)
  //测试是否拼接成功(不用管)
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
     console.log("组地址控制窗帘发布成功")
    }
  })
  //获取消息并显示
  client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
    console.log("Received Topic:",topic);
    console.log("Received Message:",payload.toString());
    console.log("-------------截取topic--------------------");
    console.log(topic.indexOf('g'))
    console.log(topic.substr(topic.indexOf('g')))
    console.log("-------------截取topic--------------------");
    var cuttopic = topic.substr(topic.indexOf('g'))
    console.log(cuttopic)
     if(topic.substr(topic.indexOf('g')) == 'getdata'){
      var str = JSON.parse(payload.toString()); //str为json类型 
      if(str.recv_fail ==undefined){
        res.send(resObj2(200,'success!',str));
      }else{
        res.send(resObj2(201,'fail!',[]));
      }       
    }//if
  });//on    
})

//发布通过组地址获取LED状态(g为获取)
router.post('/getLedByGro',function(req,res){
  let {topic,GroupId,Rled,Gled,Bled} = req.body
 
  console.log(GroupId)
  console.log("Rled的值")
  console.log(Rled)
  console.log("Gled的值")
  console.log(Gled)
  console.log("Bled的值")
  console.log(Bled)
  //获取三个灯
  if(Rled == 'g'&& Gled == 'g'&& Bled == 'g'){
  //拼接为json格式
  var strMac1 = '{"GroupId":"'
  var strMac2 = '",'
  var strRled1 = '"Rled":"'
  var strRled2 = '",'
  var strGled1 = '"Gled":"'
  var strGled2 = '",'
  var strBled1 = '"Bled":"'
  var strBled2 = '"}'
  var message = strMac1+GroupId+strMac2+strRled1+Rled+strRled2+strGled1+Gled+strGled2+strBled1+Bled+strBled2
  console.log(message)
  }
  //如果仅获取一个灯（Rled）
  else if(Rled == 'g'&& Gled != 'g'&& Bled != 'g'){
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '"}'
    var message = strMac1+GroupId+strMac2+strRled1+Rled+strRled2
    console.log(message)
  }   
  //如果仅获取一个灯（Gled）
  else if(Rled != 'g'&& Gled == 'g'&& Bled != 'g'){
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '"}'
    var message = strMac1+GroupId+strMac2+strGled1+Gled+strGled2
    console.log(message)
  }
  //如果仅获取一个灯（Bled）
  else if(Rled != 'g'&& Gled != 'g'&& Bled == 'g'){
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+GroupId+strMac2+strBled1+Bled+strBled2
    console.log(message)
  }
  //如果获取两个灯（Rled,Gled）
  else if(Rled == 'g'&& Gled == 'g'&& Bled != 'g'){
    //拼接为json格式
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '"}'
    var message = strMac1+GroupId+strMac2+strRled1+Rled+strRled2+strGled1+Gled+strGled2
    console.log(message)
  }  
  //如果获取两个灯（Rled,Bled）
  else if(Rled == 'g'&& Gled != 'g'&& Bled == 'g'){
    //拼接为json格式
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+GroupId+strMac2+strRled1+Rled+strRled2+strBled1+Bled+strBled2
    console.log(message)
  } 
  //如果获取两个灯（gled,Bled）
  else if(Rled != 'g'&& Gled == 'g'&& Bled == 'g'){
    //拼接为json格式
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+GroupId+strMac2+strGled1+Gled+strGled2+strBled1+Bled+strBled2
    console.log(message)
  }          
  //测试是否拼接成功
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
      console.log("获取LED状态发布成功")
    }
  })
        //获取消息并显示
        client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
          console.log("Received Topic:",topic);
          console.log("Received Message:",payload.toString());
          console.log("-------------截取topic--------------------");
          console.log(topic.indexOf('g'))
          console.log(topic.substr(topic.indexOf('g')))
          console.log("-------------截取topic--------------------");
          var cuttopic = topic.substr(topic.indexOf('g'))
          console.log(cuttopic)
           if(topic.substr(topic.indexOf('g')) == 'getdata'){
            var str = JSON.parse(payload.toString()); //str为json类型 
            if(str.recv_fail ==undefined){
              res.send(resObj2(200,'success!',str));
            }else{
              res.send(resObj2(201,'fail!',[]));
            }       
          }//if
        });//on  

})

//发布通过组地址控制LED灯(3个值1 0 -1 1开 0关 -1不操作)
router.post('/conLedByGro',function(req,res){
  let {topic,GroupId,Rled,Gled,Bled} = req.body

  console.log(GroupId)
  console.log("Rled的值")
  console.log(Rled)
  console.log("Gled的值")
  console.log(Gled)
  console.log("Bled的值")
  console.log(Bled)
  //如果控制三个灯
  if(Rled != '-1'&& Gled != '-1'&& Bled != '-1'){
  //拼接为json格式
  var strMac1 = '{"GroupId":"'
  var strMac2 = '",'
  var strRled1 = '"Rled":"'
  var strRled2 = '",'
  var strGled1 = '"Gled":"'
  var strGled2 = '",'
  var strBled1 = '"Bled":"'
  var strBled2 = '"}'
  var message = strMac1+GroupId+strMac2+strRled1+Rled+strRled2+strGled1+Gled+strGled2+strBled1+Bled+strBled2
  console.log(message)
  }
  //如果仅有一个灯（Rled）
  else if(Rled != '-1'&& Gled == '-1'&& Bled == '-1'){
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '"}'
    var message = strMac1+GroupId+strMac2+strRled1+Rled+strRled2
    console.log(message)
  }   
  //如果仅有一个灯（Gled）
  else if(Rled == '-1'&& Gled != '-1'&& Bled == '-1'){
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '"}'
    var message = strMac1+GroupId+strMac2+strGled1+Gled+strGled2
    console.log(message)
  }
  //如果仅有一个灯（Bled）
  else if(Rled == '-1'&& Gled == '-1'&& Bled != '-1'){
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+GroupId+strMac2+strBled1+Bled+strBled2
    console.log(message)
  }
  //如果有两个灯（Rled,Gled）
  else if(Rled != '-1'&& Gled != '-1'&& Bled == '-1'){
    //拼接为json格式
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '"}'
    var message = strMac1+GroupId+strMac2+strRled1+Rled+strRled2+strGled1+Gled+strGled2
    console.log(message)
  }  
  //如果有两个灯（Rled,Bled）
  else if(Rled != '-1'&& Gled == '-1'&& Bled != '-1'){
    //拼接为json格式
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strRled1 = '"Rled":"'
    var strRled2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+GroupId+strMac2+strRled1+Rled+strRled2+strBled1+Bled+strBled2
    console.log(message)
  } 
  //如果有两个灯（gled,Bled）
  else if(Rled == '-1'&& Gled != '-1'&& Bled != '-1'){
    //拼接为json格式
    var strMac1 = '{"GroupId":"'
    var strMac2 = '",'
    var strGled1 = '"Gled":"'
    var strGled2 = '",'
    var strBled1 = '"Bled":"'
    var strBled2 = '"}'
    var message = strMac1+GroupId+strMac2+strGled1+Gled+strGled2+strBled1+Bled+strBled2
    console.log(message)
  }          
  //测试是否拼接成功
  var MAC = JSON.parse(message);
  console.log(MAC)
  //发布
  client.publish(topic, message, (error) => {
    if (error) {
      console.error(error)
    }else{
      console.log("控制LED灯发布成功")
    }
  })
     
  //获取消息并显示
  client.on("message", (topic, payload) => {  //topic 为收到消息的主题，payload为内容
    console.log("Received Topic:",topic);
    console.log("Received Message:",payload.toString());
    console.log("-------------截取topic--------------------");
    console.log(topic.indexOf('g'))
    console.log(topic.substr(topic.indexOf('g')))
    console.log("-------------截取topic--------------------");
    var cuttopic = topic.substr(topic.indexOf('g'))
    console.log(cuttopic)
     if(topic.substr(topic.indexOf('g')) == 'getdata'){
      var str = JSON.parse(payload.toString()); //str为json类型 
      if(str.recv_fail ==undefined){
        res.send(resObj2(200,'success!',str));
      }else{
        res.send(resObj2(201,'fail!',[]));
      }       
    }//if
  });//on   
})



module.exports = router;