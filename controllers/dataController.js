var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

getDataInfo = (req, res, next) =>{ // 获取全部data信息
  let userId = req.query.userId
  const sql = `SELECT * FROM appdatainf where deviceId in (SELECT deviceId FROM userdeviceinf where userId =  ${userId})`
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }

  //获取指定id的数据信息
getDataInfoById =function (req, res, next) { // 根据id查找data
  let deviceId = req.query.deviceId 
  let userId = req.query.userId
  const sql = `SELECT * FROM appdatainf where deviceId = ${deviceId} and deviceId in (SELECT deviceId FROM userdeviceinf where userId =  ${userId})`
  db.query(sql, [], function (result, fields) {
    if(result != '')
    res.send(resObj(200,result, 'success'));
    else{
      res.send(resObj(201,result, '未查到该设备信息'));
    }
  })
}

  module.exports = {
    getDataInfo,
    getDataInfoById
  }