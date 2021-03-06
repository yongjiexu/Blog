/*
* 应用程序的启动文件
* */

// 加载express模块
var express = require('express')
// 加载模板处理模块
var swig = require('swig')
//加载数据库模块
var mongoose = require('mongoose')
// 创建app应用
var app = express()

//设置静态文件托管
//当用户访问的url以 /public 开始，直接返回对应的 __dirname + '/public' 目录下的文件
app.use('/public', express.static(__dirname + '/public'))

// 配置应用模板
// 定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称,同时也是模板文件的后缀；第二个参数：解析处理模板内容的方法
app.engine('html', swig.renderFile)
//设置模板文件存放的目录
app.set('views', './views')
//注册使用的模板引擎
app.set('view engine', 'html')
//开发时，取消模板缓存
swig.setDefaults({cache: false})

/*
* 根据不同的功能划分模块,将路由挂载到应用上
* */
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))

mongoose.connect('mongodb://localhost:27017/blog',{ useMongoClient: true }, function (err) {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('数据库连接成功')
        // 监听http请求
        app.listen(8081)
    }
})
