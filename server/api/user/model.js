/**
 * Created by wupeng5 on 2017/7/19.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    age:String
});

module.exports = mongoose.model('User',userSchema);