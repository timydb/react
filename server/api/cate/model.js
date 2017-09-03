/**
 * Created by wupeng5 on 2017/7/19.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id:String,
    name:String
});

module.exports = mongoose.model('Cate',userSchema);