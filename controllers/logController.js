var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

getLogInfo = (req, res, next) =>{ // 获取全部log信息
    const sql = "SELECT * FROM log"
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }

  module.exports = {
    getLogInfo
  }