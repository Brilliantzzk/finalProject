const mqtt = require('mqtt')


// 连接选项
const options = {
      clean: true, // true: 清除会话, false: 保留会话
      connectTimeout: 4000, // 超时时间
      // 认证信息
      clientId: 'emqx_test',
      username: 'emqx_test',
      password: 'emqx_test',
}

// 连接字符串, 通过协议指定使用的连接方式
// ws 未加密 WebSocket 连接
// wss 加密 WebSocket 连接
// mqtt 未加密 TCP 连接
// mqtts 加密 TCP 连接
// wxs 微信小程序连接
// alis 支付宝小程序连接
const connectUrl = 'ws://47.113.206.162:1883/mqtt'
const client = mqtt.connect(connectUrl, options)

client.on('reconnect', (error) => {
    console.log('正在重连:', error)
})

client.on('error', (error) => {
    console.log('连接失败:', error)
})

client.on('message', (topic, message) => {
  console.log('收到消息：', topic, message.toString())
})
