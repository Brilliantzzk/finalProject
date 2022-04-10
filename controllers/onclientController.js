var db  = require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}


// 获取全部在线主题信息
getOnclient = (req, res, next) =>{ 
    const sql = `SELECT * FROM  onclient where clientSta = 1`
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }

  module.exports = {
      getOnclient,
  }