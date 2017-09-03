/**
 * Created by wupeng5 on 2017/7/19.
 */

var User = require('./model.js');
var Q = require("q");

var utils = require('../../httpClient/serverUtils.js');

//注意接受参数的2种形式

//post : req.body.name
//get  : req.params.ids
//批量处理数据关键字  $in

exports.getList = function(req,res){
    //var _name = req.body.name;
    //var _age = req.body.age;
    //var user = new User({name:_name,age:_age});
    var data = {
        "id":"1111",
        "arr":[
            {"id":"1","name":"aa","age":1,"add":"true","app":"v1.0"},
            {"id":"2","name":"bb","age":2,"add":"true","app":"v2.0"},
            {"id":"3","name":"cc","age":3,"add":false,"app":"v3.0"}
        ],
        "total":10,
        "count":"100",
        "status":true
    }

    return res.status(200).json({rc:true,data:data});
    //user.save(function(err,data){
    //    if(err){
    //        return res.status(200).json({rc:false,data:err});
    //    }
    //    else{
    //        return res.status(200).json({rc:true,data:user});
    //    }
    //})
}

exports.editUser = function(req,res){
    var _id = req.body.id;
    return res.status(200).json({rc:true,data: "修改成功!"});
}

exports.removeByIds = function(req,res){
    var ids = req.params.ids.split(',');
    User.remove({_id:{$in:ids}},function(err){
        if(err){
            return res.status(200).json({rc:false,data: err});
        } else{
            return res.status(200).json({rc:true,data: "批量删除成功!"});
        }
    })
}