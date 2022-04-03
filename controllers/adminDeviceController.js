var db  = require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

// //获取设备所有信息
// getDevInfo = (req, res, next) =>{ // 获取全部信息
//   let userId = req.query.userId
//   const sql = `SELECT * FROM deviceinf`
//   db.query(sql, [], function (result, fields) {
//     res.send(resObj(200,result, 'success'));
//   })
// }


// //获取指定id的设备信息
// getDevInfoById = function (req, res, next) { // 根据id查找device
//   let deviceId = req.query.deviceId
//   const sql1 = `SELECT * FROM deviceinf where deviceId = ${deviceId} `
//   db.query(sql1, [], function (result, fields) {
//     if(result!='')
//     res.send(resObj(200,result, 'success'));
//     else{
//       res.send(resObj(202,result, '未查到该设备'));
//     }
//   })
// }

//获取用户及其拥有的设备信息
getUserDeviceInfo = (req, res, next) =>{ 
    let userId = req.query.userId
    const sql = `SELECT * FROM userdeviceinf`
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }


// //删除设备的处理函数
delDevInfoById = (req,res,next)=> { // 根据id删除
  let deviceId = req.body.deviceId
  const sql1 = `SELECT * FROM deviceinf where deviceId = ${deviceId}`
  db.query(sql1, [], function (result, fields) {
    if (result.length !== 0) {
      const sql2 = `delete from deviceinf where deviceId = ${deviceId}`
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

//增加设备
 addDevice = function(req,res,next){ // 添加
  let {macAddr,deviceSta,net} = req.body
  console.log(req.body)
  const sql1 = `insert into deviceinf(macAddr,deviceSta,net)values( '${macAddr}',${deviceSta},'${net}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      const sql2 =  `SELECT * FROM deviceinf where macAddr = '${macAddr}'`
      db.query(sql2, [], function(result2, fields2){
        if (result2 !== null) {   
          console.log(result2)
          res.send(resObj(200,result2,'添加成功'))
        } 
      })
    } else {
      res.send(resObj(201,[], '增加失败'));
    }
  })
}



// //更新设备信息
updateDevice = (req,res,next)=>{ // 根据id修改
  let {deviceId,net,deviceSta} = req.body
  const sql1 = `SELECT * FROM deviceinf where deviceId = ${deviceId}`
  db.query(sql1, [], function (result, fields) {
    console.log(result)
    if (result !== []) {
      // 需要注意'${}'的引号必须要有，sql语句才能识别name字符串
      const sql2 = `update deviceinf set deviceSta =${deviceSta},net = '${net}' where deviceId = ${deviceId}` 
      db.query(sql2, [], function(result2, fields2){
        if (result2 !== null) {
          res.send(resObj(200, req.body, '修改成功'));
        } else {
          res.send(resObj(201, [], '修改失败'));
        }
      })
    } else {
      res.send(resObj(202, [], '无此id!'));
    }
  })
}

module.exports = {
    // getDevInfo,
    // getDevInfoById,
    getUserDeviceInfo,
    delDevInfoById,
    updateDevice,
    addDevice,
}