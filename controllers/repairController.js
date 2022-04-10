var db= require('../utill/dbconfig')

const resObj = (code,data, msg) => {
  return {
    code: code,
    data: data,
    msg: msg
  }
}

//获取报修信息
getRepairInfo = (req, res, next) =>{ 
    const sql = `SELECT * FROM repairinf`
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }


//获取报修信息(需传入状态)
getRepairInfoBySta = (req, res, next) =>{ 
    let repairSta = req.query.repairSta
    const sql = `SELECT * FROM repairinf where repairSta  = ${repairSta}`
    db.query(sql, [], function (result, fields) {
      res.send(resObj(200,result, 'success'));
    })
  }

  //增加报修信息(需要传入deviceId，repairText)
addRepairInfo = (req,res,next)=>{     
    //处理时间
    // var date = new Date();//将当前时间保存为初始值
    var date1 = new Date().toLocaleString("zh-CN",{hour12:false})//将当前时间保存为初始值并转换为本地时间
    // var year = date.getFullYear();
    // var month = date.getMonth();
    // var day = date.getDay();
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    // var seconds = date.getSeconds();
    // if (month < 10) {
    //     month = "0" + month;
    // }
    // if (day < 10) {
    //     day = "0" + day;
    // }
    // var sqlTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    // console.log(date);
     console.log(date1);
    // console.log(sqlTime);
  
    let {deviceId,repairText} = req.body
    console.log(req.body)
    const sql1 = `INSERT INTO repairinf(deviceId,repairTime,repairText,repairSta)VALUES(${deviceId},'${date1}','${repairText}',0)`
    db.query(sql1, function (result, fields) {
      if (fields !== undefined && result === null) {
        const sql2 =  `SELECT * FROM repairinf where repairTime = '${date1}' and deviceId = ${deviceId}`
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
  

//修改报修信息
updateRepairInfo = (req,res,next)=>{ // 根据id修改
  let {repairId,repairSta} = req.body
  const sql1 = `SELECT * FROM repairinf where repairId = ${repairId}`
  db.query(sql1, [], function (result, fields) {
    console.log(result)
    if (result !== []) {
      // 需要注意'${}'的引号必须要有，sql语句才能识别name字符串
      const sql2 = `update repairinf set repairSta ='${repairSta}' where repairId = ${repairId}` 
      db.query(sql2, [], function(result2, fields2){
        console.log(result2)
        if (result2 !== null) {
          res.send(resObj(200,result, '修改成功'));
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
    getRepairInfo,
    getRepairInfoBySta,
    addRepairInfo,
    updateRepairInfo
  }