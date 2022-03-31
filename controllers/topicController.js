var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

getTopicInfo = (req, res, next) =>{ // 获取全部user信息
    const sql = "SELECT * FROM topicinfo"
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }

  module.exports = {
    getTopicInfo
  }