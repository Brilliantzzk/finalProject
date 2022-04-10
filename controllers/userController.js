var db  = require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}
//获取用户所有信息
getUserInfo = (req, res, next) =>{ // 获取全部user信息
  const sql = "SELECT * FROM users"
  db.query(sql, [], function (result, fields) {
    res.send(resObj(200,result, 'success'));
  })
}

//获取指定id的用户信息
getUserInfoById =function (req, res, next) { // 根据id查找user
  let userId = req.query.userId
  const sql = `SELECT * FROM users where userId = ${userId}`
  db.query(sql, [], function (result, fields) {
    if(result!='')
    res.send(resObj(200,result, 'success'));
    else{
      res.send(resObj(200,result, '未查到该用户'));
    }
  })
}

// //获取指定name的用户信息
// getUserInfoByName =(req,res)=>{
//     let userinfo = req.query
//     console.log(userinfo)
//     var sql = 'select * from users where username=?'
//     var sqlArr = [userinfo.username]
//     var callback = (err,data)=>{
//         if(err){
//           console.log('连接出错')
//         }else{
//           res.send({
//             'list' : data
//           })
//         }
//       }
//       dbConfig.sqlConnect(sql,sqlArr,callback)
// }

//增加用户函数
addUserInfoById = function(req,res,next){ // 添加user
  let {userName,password} = req.body
  const sql = `insert into users(userName,password)values( '${userName}','${password}')`
  db.query(sql, function (result, fields) {
    if (fields !== undefined && result === null) {
      res.send(resObj(200,[], 'success'));
    } else {
      res.send(resObj(201,[], 'fail'));
    }
  })
}

// //删除用户的处理函数
delUserById = (req,res,next)=> { // 根据id删除用户
  let userId = req.query.userId
  const sql1 = `SELECT * FROM users where userId = ${userId}`
  db.query(sql1, [], function (result, fields) {
    console.log(result)
    console.log(result.length)
      if (result.length !== 0) {
      const sql2 = `delete from users where userId = ${userId}`
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


// //修改用户的处理函数
updateUserInfoById = (req,res,next)=>{ // 根据id修改user
  let {userId,userName,password} = req.body
  console.log(req.body)
  // 判断数据是否合法
  if (!req.body.userName || !req.body.password) {
    return res.send(resObj(201, [], '用户名或密码不能为空!'));
    }
 
  //定义SQL 语句，查询用户名是否被占用
  const sql = `select * from users where userName = '${userName}'`
  db.query(sql,[],function(result,fields){
    // 判段用户名是否被占用（由于select结果为数组，通过判断数组长度，如果查到，则证明有该用户名，数组长不为0）
    if (result.length > 0) {
      return res.send(resObj(201, [], '用户名被占用，请更换其他用户名!'));
    }
    const sql1 = `SELECT * FROM users where userId = ${userId}`
    db.query(sql1, [], function (result, fields) {
      console.log(result)
      if (result.length != 0) {
        // 需要注意'${name}'的引号必须要有，sql语句才能识别name字符串
        const sql2 = `update users set userName = '${userName}', password ='${password}'where userId = ${userId}` 
        db.query(sql2, [], function(result2, fields2){
          if (result2.length !==0) {
            res.send(resObj(200, req.body, '修改成功'));
          } else {
            res.send(resObj(201, [], '修改失败'));
          }
        })
      } else {
        res.send(resObj(202, [], '无此id!'));
      }
    })
  })
}


// 注册用户的处理函数
userReg = (req, res) => {
    // 接收表单数据（接收从客户端传来的数据）
    let {userName,password} = req.body
    console.log(req.body)
    // 判断数据是否合法
    if (!req.body.userName || !req.body.password) {
      return  res.send(resObj(201, [], '用户名或密码不能为空!'));
      }
   
    //定义SQL 语句，查询用户名是否被占用
    const sql = `select * from users where userName = '${userName}'`
    db.query(sql,[],function(result,fields){
      // 判段用户名是否被占用（由于select结果为数组，通过判断数组长度，如果查到，则证明有该用户名，数组长不为0）
      if (result.length > 0) {
        return res.send(resObj(201, [], '用户名被占用，请更换其他用户名!'));
      }
      
      const sql = `insert into users(userName,password)values( '${userName}','${password}')`
      db.query(sql, function (result, fields) {
        //console.log(result)  result 返回结果
        //console.log(fields) 数据库相关 的
        if (fields !== undefined && result === null) {
          const sql2 = `select * from users where userName = '${userName}' and password = '${password}'`
          db.query(sql2,[], function (result2, fields) {
            console.log(result2) 
            if(result2!='')
            res.send(resObj(200,result2, '注册成功'));
          }) 
        } else {
          res.send(resObj(201,[], 'fail'));
        }
      })
    })
  }
  // 登录的处理函数
 userLogin = (req, res,next) => {
  let{userName,password} = req.body
  console.log(req.body)
  console.log(userName)
  console.log('-----------------')
  console.log(req.body.userName)
  console.log('-----------------')
  const sql1 = `SELECT * FROM users where userName = '${userName}' and password = '${password}'`
  db.query(sql1,[],function(result,fields){
    console.log(result)
    console.log('-----------------')
    console.log(result.length)                  //判断空数组?
    if(result.length == 0){
      res.send(resObj(201,[],'用户名或密码错误！'))
    }else{
      const sql2 =  `SELECT userId,userName FROM users where userName = '${userName}' and password = '${password}'`
      db.query(sql2, [], function(result2, fields2){
        if (result2 !== null) {   
          console.log(result2)
          res.send(resObj(200,result2,'登录成功'))
        } 
      })
    }
  })
 }

module.exports = {
    getUserInfo,
    getUserInfoById,
    //getUserInfoByName,
    userLogin,
    userReg,
    delUserById,
    updateUserInfoById,

}