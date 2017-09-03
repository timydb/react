/**
 * Created by wupeng5 on 2017/8/31.
 */

var CacheControl = function(){

    this.dict = {};

    this.set = function(key,val){
        this.dict[key] = val;
    }

    this.get = function(key){
        var res = null;
        for(var i in this.dict){
            if(key == i && this.dict[key]){
                res = this.dict[key];
                break;
            }
        }
        return res;
    }
}
var cachePub = new CacheControl();