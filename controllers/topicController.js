var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

// 获取全部主题信息
admingetTopicInfo = (req, res, next) =>{ 
  const sql = `SELECT * FROM topicinf`
  db.query(sql, [], function (result, fields) {
    res.send(resObj(200,result, 'success'));
  })
}

// 获取全部主题信息（传入userId、topic）
getTopicInfo = (req, res, next) =>{ 
  let userId = req.query.userId
  const sql = `SELECT * FROM topicinf where userId = ${userId}`
  db.query(sql, [], function (result, fields) {
    res.send(resObj(200,result, 'success'));
  })
}
  

//增加主题(需要传入userId、topic) 
addTopicInfo = (req,res,next)=>{ 
  let {userId,topic} = req.body
  console.log(req.body)
  const sql1 = `insert into topicinf(userId,topic)values(${userId},'${topic}')`
  db.query(sql1, function (result, fields) {
    if (fields !== undefined && result === null) {
      const sql2 =  `SELECT * FROM topicinf where topic = '${topic}' and userId = ${userId}`
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

//删除主题的处理函数
delTopInfo = (req,res,next)=> { // 根据id删除用户所创建的主题
  let {userId,topicId} = req.body
  const sql1 = `SELECT * FROM topicinf where topicId = ${topicId} and userId =  ${userId}`
  db.query(sql1, [], function (result, fields) {
    console.log(result)
    console.log(result.length)
      if (result.length !== 0) {
      const sql2 = `delete from topicinf where  topicId = ${topicId} and userId =  ${userId}`
      db.query(sql2, [], function (result2, fields2) {
        if (result2.length !== 0) {
          res.send(resObj(200, result, '删除成功'));
        } else {
          res.send(resObj(201, [], '删除失败'));
        }
      })
    } else {
      res.send(resObj(202, [], '无此id!'));
    }
  })
}

//更新主题信息
updateTopInfo = (req,res,next)=>{ // 根据id修改
  let {userId,topicId,topic} = req.body
  const sql1 = `SELECT * FROM topicinf where userId = ${userId} and topicId = ${topicId}`
  db.query(sql1, [], function (result, fields) {
    console.log(result)
    if (result !== []) {
      // 需要注意'${}'的引号必须要有，sql语句才能识别name字符串
      const sql2 = `update topicinf set topic ='${topic}' where userId = ${userId} and topicId = ${topicId}` 
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
    getTopicInfo,
    addTopicInfo,
    delTopInfo,
    updateTopInfo,
    admingetTopicInfo
  }