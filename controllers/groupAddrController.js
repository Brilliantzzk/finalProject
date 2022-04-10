var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

//获取设备所有信息
GetGroupInfo = (req, res, next) =>{ // 获取全部信息
    const sql = `SELECT * FROM groupinf`
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }
  
  module.exports = {
      GetGroupInfo,
  }