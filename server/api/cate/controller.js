/**
 * Created by wupeng5 on 2017/7/19.
 */

var User = require('./model.js');
var Q = require("q");

exports.getList = function(req,res){
    var data = {
        "data":[
            {"name":"aaa","code":"1"},
            {"name":"bbb","code":"2"},
            {"name":"ccc","code":"3"},
            {"name":"ab","code":"4"},
            {"name":"bc","code":"5"},
            {"name":"ac","code":"6"},
            {"name":"ad","code":"7"},
            {"name":"qqqfsqc","code":"8"},
            {"name":"ww","code":"9"}
        ]
    }

    return res.status(200).json({rc:true,data:data});
}