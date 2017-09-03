/**
 * Created by wupeng5 on 2017/7/19.
 */

var User = require('./model.js');
var Q = require("q");

exports.getList = function(req,res){
    var data = {
        "id":"1111",
        "arr":[
            {"id":"1","name":"js","price":100,"app":"v1.0"},
            {"id":"2","name":"css","age":220,"app":"v2.0"},
            {"id":"3","name":"html","age":313,"app":"v3.0"}
        ],
        "total":10,
        "count":"100",
        "status":true
    }

    return res.status(200).json({rc:true,data:data});
}