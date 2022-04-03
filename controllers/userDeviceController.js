var db  = require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

//获取设备所有信息
getDevInfo = (req, res, next) =>{ // 获取全部信息
  let userId = req.query.userId
  const sql = `SELECT * FROM deviceinf where deviceId in (SELECT deviceId FROM userdeviceinf where userId = ${userId})`
  db.query(sql, [], function (result, fields) {
    res.send(resObj(200,result, 'success'));
  })
}


//获取指定id的设备信息
getDevInfoById = function (req, res, next) { // 根据id查找用户的device
  let userId = req.query.userId
  let deviceId = req.query.deviceId
  const sql1 = `SELECT * FROM deviceinf where deviceId = ${deviceId} and deviceId in (SELECT deviceId FROM userdeviceinf where userId = ${userId})`
  db.query(sql1, [], function (result, fields) {
    if(result!='')
    res.send(resObj(200,result, 'success'));
    else{
      res.send(resObj(202,result, '未查到该设备'));
    }
  })
}

// //删除设备的处理函数
delDevInfoById = (req,res,next)=> { // 根据id删除用户所使用的device
    let {userId,deviceId} = req.body
    const sql1 = `SELECT * FROM userdeviceinf where deviceId = ${deviceId} and userId =  ${userId}`
    db.query(sql1, [], function (result, fields) {
      console.log(result)
      console.log(result.length)
        if (result.length !== 0) {
        const sql2 = `delete from userdeviceinf where  deviceId = ${deviceId} and userId =  ${userId}`
        db.query(sql2, [], function (result2, fields2) {
          if (result2.length !== 0) {
            res.send(resObj(200, deviceId, '删除成功'));
          } else {
            res.send(resObj(201, [], '删除失败'));
          }
        })
      } else {
        res.send(resObj(202, [], '无此id!'));
      }
    })
  }
  
  //增加用户可用的设备
   addDevice = function(req,res,next){ // 添加
    let {userId,deviceId} = req.body
    console.log(req.body)
    const sql1 =  `SELECT * FROM deviceinf where deviceId = '${deviceId}'`
    db.query(sql1, [],function (result, fields) {
      console.log(result)
      console.log(result.length)
        if (result.length == 0) {
            res.send(resObj(201,[], '增加失败'));

      } else {
        const sql2 = `insert into userdeviceinf(userId,deviceId)values( ${userId},${deviceId})`      
        db.query(sql2, [], function(result2, fields2){
          if (result2 !== null) {   
            console.log(result2)
            res.send(resObj(200,[],'添加成功'))
          } 
        })
      }
    })
  }
  
  module.exports = {
    getDevInfo,
    getDevInfoById,
    delDevInfoById,
    addDevice,
}