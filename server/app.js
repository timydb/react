/**
 * Created by wupeng5 on 2017/7/19.
 */

//加载依赖的lib
var path 			= require('path');
var express 		= require('express');
var mongoose		= require('mongoose');

//如果有数据库修改成路径, mac本直接修改后面的数据库名称, 如果没有就注释掉
//mongoose.connect("mongodb://localhost/survey");

//初始化端口号
var port = 3008;

//setup server
var app = express();

//这个包非常重要，是为了解决nodejs里面post参数接受异常的问题
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//创建node服务
var server = require('http').createServer(app);

//设置端口号
app.set('port',port);

//这个也非常重要，设置前端HTML页面的相对路径, 后面的参数可按照实际情况修改
//app.use(express.static(path.join(__dirname,'../Client')));

//引入路由文件,  路由全部在routes.js里面
require('./routes')(app);

//start server
server.listen(port, function() {
    console.log('Your node server is running on '
        + app.get('env') + ' at ' + port + ' ~');
});

app.get("*",function(req,res){
    res.sendFile(path.resolve(__dirname, '../index.html'));
    //res.redirect("http://r.com/");
})

//没有找到路由的情况下发送404
app.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 - Page not found!!!!!!');
});

//当系统错误，走500
app.use(function(req, res) {
    res.status(500);
    res.type('text/plain');
    res.send('500 - Server error!');
});