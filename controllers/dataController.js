var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

getDataInfo = (req, res, next) =>{ // 获取全部user信息
    const sql = "SELECT * FROM data"
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }

  //获取指定id的数据信息
getDataInfoById =function (req, res, next) { // 根据id查找data
  let deviceId = req.query.deviceId 
  const sql = `SELECT * FROM data where deviceId  = ${deviceId}`
  db.query(sql, [], function (result, fields) {
    if(result != '')
    res.send(resObj(200,result, 'success'));
    else{
      res.send(resObj(200,result, '未查到该设备信息'));
    }
  })
}

  module.exports = {
    getDataInfo,
    getDataInfoById
  }