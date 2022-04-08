var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}
//获取全部data信息 （传入userId）
getDataInfo = (req, res, next) =>{ 
  let userId = req.query.userId
  const sql = `SELECT * FROM appdatainf where deviceId in (SELECT deviceId FROM userdeviceinf where userId =  ${userId})`
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }

  //获取指定设备的id的数据信息（传入用户ID 设备ID）
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