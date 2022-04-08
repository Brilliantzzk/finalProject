//导入mysql模块
const mysql = require('mysql')

// module.exports = {
//     config:{
//         host : '127.0.0.1',
//         user : 'root',
//         password : '123456',
//         database : 'mqtt',
//     },

// //连接数据库，使用mysql的连接池连接方式
// //连接池对象
// sqlConnect:function(sql,sqlArr,callback){
//     var pool = mysql.createPool(this.config)
//     pool.getConnection((err,conn)=>{
//         if(err){
//             console.log('连接失败')
//             return
//         }
//        //事件驱动回调
//        conn.query(sql,sqlArr,callback)
//        //释放连接
//        conn.release()
//     })
// },
// //promise回调(异步)
// SySqlConnect:function(sySql,sqlArr){
//     return new Promise((resolve,reject)=>{
//         var pool = mysql.createPool(this.config)
//         pool.getConnection((err,conn)=>{
//             if(err){
//                 reject(err)
//             }else{
//                 //事件驱动回调
//                 conn.query(sySql,sqlArr,(err,data)=>{
//                     if(err){
//                         reject(err)
//                     }else{
//                         resolve(data)
//                     }
//                 })
//                 //释放连接
//                 conn.release()
//             }
//         })
//     }).catch((err)=>{
//         console.log(err)
//     })
// }


// }
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'final',
    timezone: "08:00"//这是 Mysql时区 与 Node时区 不一致导致的。解决方法：配置Node数据库连接。加上 timezone 这一行：
}


module.exports = {
    query: function (sql, params, callback) {
        let connection = mysql.createConnection(dbConfig);
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            connection.query(sql, params, function (err, results, fields) {
                if (err) {
                    console.log('数据操作失败');
                    throw err;
                }
                let results1 = results === undefined ? results : JSON.parse(JSON.stringify(results))
                let fields1 = fields === undefined ? fields : JSON.parse(JSON.stringify(fields))
                callback && callback(results1, fields1);
                connection.end(function (err) {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    }

};


