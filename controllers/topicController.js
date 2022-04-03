var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

getTopicInfo = (req, res, next) =>{ // 获取全部主题信息
    const sql = "SELECT * FROM topicinfo"
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }

  //增加设备
addTopicInfo = (req,res,next)=>{ // 添加
  let {topic} = req.body
  console.log(req.body)
  const sql1 = `insert into topicinfo(topic)values( '${topic}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      const sql2 =  `SELECT * FROM topicinfo where topic = '${topic}'`
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

  module.exports = {
    getTopicInfo,
    addTopicInfo,
  }