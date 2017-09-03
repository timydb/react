/**
 * Created by mac on 16/6/1.
 */

/*****************为一些基本数据类型添加一些常用方法******************/

    ///**********************************
    /// String prototypes
    ///**********************************
    //去掉字符串2变的空格
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, '');
}

///**********************************
/// Array prototypes
///**********************************
//数组去重, 值类型和引用类型均可判断
Array.prototype.unique = function(){
    this.sort();
    var re=[this[0]];

    if(typeof this[0] == "object"){
        for(var i = 1; i < this.length; i++) {
            if(jsCoreMethod.equals(this[i],re[re.length-1])== false) {
                re.push(this[i]);
            }
        }
    }else{
        for(var i = 1; i < this.length; i++) {
            if( this[i] !== re[re.length-1]) {
                re.push(this[i]);
            }
        }
    }


    return re;
}
//数组去重
Array.prototype.arrUniq = function(fn) {
    var temp,arrVal,
        array = this,
        arrClone = array.concat(),//克隆数组
        typeArr = {//数组原型
            'obj' : '[object Object]',
            'fun' : '[object Function]',
            'arr' : '[object Array]',
            'num' : '[object Number]'
        },
        ent = /(\u3000|\s|\t)*(\n)+(\u3000|\s|\t)*/gi;//空白字符正则

    //把数组中的object和function转换为字符串形式
    for(var i = arrClone.length; i--;){
        arrVal = arrClone[i];
        temp = Object.prototype.toString.call(arrVal);

        if(typeof fn == 'function') arrVal = fn(arrVal);

        if(temp == typeArr['num'] && arrVal.toString() == 'NaN'){
            arrClone[i] = arrVal.toString();
        }

        if(temp == typeArr['obj']){
            arrClone[i] = JSON.stringify(arrVal);
        }

        if(temp == typeArr['fun']){
            arrClone[i] = arrVal.toString().replace(ent,'');
        }

    }

    //去重关键步骤
    for (var i = arrClone.length; i--;) {
        arrVal = arrClone[i];
        temp = Object.prototype.toString.call(arrVal);

        if(temp == typeArr['arr']) arrVal.arrUniq();//如果数组中有数组，则递归
        if (arrClone.indexOf(arrVal) != arrClone.lastIndexOf(arrVal)) {//如果有重复的，则去重
            array.splice(i,1);
            arrClone.splice(i, 1);
        }
        else{
            if(Object.prototype.toString.call(array[i]) != temp){
                //检查现在数组和原始数组的值类型是否相同，如果不同则用原数组中的替换，原因是原数组经过了字符串变换
                arrClone[i] = array[i];
            }
        }
    }
    return arrClone;
}

//get index
Array.prototype.getIndex = function(item){
    var _index = -1;
    if(!item){
        return _index;
    }
    for(var i=0;i<this.length;i++){
        if(jsCoreMethod.isObjectForArrayItem(item)){
            if(jsCoreMethod.equals(item,this[i])){
                _index = i;
                break;
            }
        }else{
            if(item == this[i]){
                _index = i;
                break;
            }
        }
    }
    return _index;
}

//check exist
Array.prototype.checkExist = function(item){
    var _index = this.getIndex(item);
    if(_index == -1){
        return false;
    }
    return true;
}

//add
Array.prototype.add = function(item){
    if(!item){
        return this;
    }
    if(!this.checkExist(item)){
        this.push(item);
    }
    return this;
}

//remove one
Array.prototype.remove = function(item){
    if(!item){
        return this;
    }
    var _index = this.getIndex(item);
    if(_index == -1){
        return this;
    }
    return this.splice(_index,1);
}

//remove items
Array.prototype.removeItems = function(items){
    if(items instanceof Array){
        for(var i=0;i<items.length;i++){
            this.remove(items[i]);
        }
    }
    return this;
}

/*
 * find item by field and key
 * {name :1,val :2} --->findItemByKey("name",1)
 */
Array.prototype.findItemByField = function(field,val){
    if(!val || !field ){
        return null;
    }
    for(var i=0;i<this.length;i++){
        if(this[i][field] == val){
            return this[i];
        }
    }
    return null;
}

//数组的复制
Array.prototype.cloneArray = function(){
    if(this.length == 0){
        return [];
    }
    var res = [];
    for(var i =0;i<this.length;i++){
        if(typeof this[i] != "object"){
            res.push(this[i]);
        }else{
            res.push(jsCoreMethod.cloneObj(this[i]));
        }
    }

    return res;
}

// get the same item in the diff Array, 极少情况会用到
Array.prototype.compareArray = function(target){
    var _index = -1;
    var res = [];
    for(var k=0;k<target.length;k++){
        _index = this.getIndex(target[k]);
        if(_index != -1){
            res.push(target[k]);
        }
    }
    return res;
}

///**********************************
/// Date prototypes
///**********************************
//2个字符串时间的比较
// d1 < d2 --->true  else false
Date.prototype.compare = function(d1){
    var tmp1 = null;
    if(typeof d1 == "string"){
        tmp1 = new Date(d1.replace(/-/g,"/"));
    }else{
        tmp1 = d1;
    }

    if(Date.parse(this) > Date.parse(tmp1)){
        return true;
    }
    return false;
}

function convertData(date){
    var y =date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    if(m <10){
        m = "0"+m;
    }
    if(d<10){
        d = "0"+d;
    }

    return  y+ "-" + m + "-" + d;
}

Date.prototype.format = function(){
    //if(this.toString() == "Invalid Date"){
    //    return "";
    //}
    //var tmp = convertData(this);
    //if(tmp == "1970-01-01"){
    //    return "";
    //}
    //if(!this.compare("1970-01-01")){
    //    return "";
    //}
    //
    //return convertData(this);
    return this.toLocaleDateString();
}

///**********************************
/// 常用的js方法
///**********************************
var jsCoreMethod = {
    isObjectForArrayItem:function(item){
        var bl = false;
        if(typeof item == "object"){
            bl = true;
        }else{
            bl = false;
        }
        return bl;
    },
    //获取当前元素的绝对left
    getAbsoluteLeft: function (el) {
        var o = el;
        var oLeft = o.offsetLeft;
        var oParent = null;
        while (o.offsetParent != null) {
            oParent = o.offsetParent;
            oLeft += oParent.offsetLeft;
            o = oParent;
        }
        return oLeft;
    },
    //获取当前元素的绝对top
    getAbsoluteTop: function (el) {
        var o = el;
        var oTop = o.offsetTop;
        while (o.offsetParent != null) {
            oParent = o.offsetParent;
            oTop += oParent.offsetTop;
            o = oParent;
        }
        return oTop;
    },
    //获取当前url后面的参数
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return decodeURIComponent(r[2]);
        return null;
    },
    /*
     * 一个数组里面按照时间字段来排序的方法
     * @data  数据源
     * @field 排序日期字段
     * @desc  升序为true 降序为true
     * */
    arraySortByDate: function (data, field, desc) {
        if (data == undefined || data.length == 0) {
            return null;
        }

        var arr = [];
        if (typeof data[0][field] == "string") {
            for (var i = 0; i < data.length; i++) {
                data[i]._tmpSortField = new Date(data[i][field].replace(/-/g, '/'));
                arr.push(data[i]);
            }
            if (desc) {
                arr.sort(function (a, b) {
                    return a._tmpSortField - b._tmpSortField;
                })
            } else {
                arr.sort(function (a, b) {
                    return b._tmpSortField - a._tmpSortField;
                })
            }

            return arr;
        }
        else {
            var res = data.cloneArray();
            if (desc) {
                res.sort(function (a, b) {
                    return a[field] - b[field];
                })
            } else {
                res.sort(function (a, b) {
                    return b[field] - a[field];
                })
            }

            return res;
        }
    },
    arraySortByNumber: function (data, field, desc) {
        if (data == undefined || data.length == 0) {
            return null;
        }
        var res = data.cloneArray();
        if (desc) {
            res.sort(function (a, b) {
                return a[field] - b[field];
            })
        } else {
            res.sort(function (a, b) {
                return b[field] - a[field];
            })
        }

        return res;
    },
    arraySortByChar: function (data, field, desc) {

        if (data == undefined || data.length == 0) {
            return null;
        }
        var res = data.cloneArray();
        if (desc) {
            res.sort(function (a, b) {
                return a[field].localeCompare(b[field]);
            })
        } else {
            res.sort(function (a, b) {
                return b[field].localeCompare(a[field]);
            })
        }

        return res;
    },
    //overwrite -->没有这个参数表示不影响数据源
    arraySortByField: function (data, field, desc, overwrite) {
        if (data == undefined || data.length == 0) {
            return null;
        }

        var res = null;
        if (!overwrite) {
            res = data.cloneArray();
        } else {
            res = data;
        }

        var tmp = res[0][field];
        //除去日期对象,其他对象类型不排序
        if (typeof tmp == "object" && tmp instanceof Date != true) {
            return data;
        }

        //日期判断
        if (typeof tmp == "object" && tmp instanceof Date) {
            res = this.arraySortByDate(res, field, desc);
        } else {
            //数字判断
            if (typeof tmp == "number") {
                res = this.arraySortByNumber(res, field, desc);
            }
            if (typeof tmp == "string") {
                //date判断
                if (!/invalid/i.test(new Date(tmp))) {
                    res = this.arraySortByDate(res, field, desc);
                }
                //字符串判断
                else {
                    res = this.arraySortByChar(res, field, desc);
                }
            }
        }

        return res;
    },
    //获取 num1 到 num2 的随机整数
    getRandom: function (num1, num2) {
        var choices = num2 - num1 + 1;
        return Math.floor(Math.random() * choices + num1);
    },
    convertStringJson: function (val) {
        if (!val) {
            return null;
        }
        if (typeof val != "object") {
            return JSON.parse(val);
        }
        else {
            return JSON.stringify(val);
        }
    },
    getLocalStorage: function (key) {
        if (!window.localStorage) {
            alert("您的浏览器不支持localStorage");
            return
        }
        return window.localStorage.getItem(key);
    },
    setLocalStorage: function (key, val) {
        if (!window.localStorage) {
            alert("您的浏览器不支持localStorage");
            return
        }
        window.localStorage.setItem(key, val);
    },
    removeLocalStorage:function(key){
        if (!window.localStorage) {
            alert("您的浏览器不支持localStorage");
            return
        }
        window.localStorage.removeItem(key);
    },
    //对象的复制
    cloneObj: function (source) {
        var copy = source.constructor();

        for (var attr in source) {
            if (source.hasOwnProperty(attr)) {
                copy[attr] = source[attr];
            }
        }
        return copy;
    },
    //比较2个对象是否相等
    equals: function (source, target) {
        var p;
        for (p in source) {
            if (typeof (target[p]) == 'undefined') {
                return false;
            }
        }

        for (p in source) {
            if (source[p]) {
                switch (typeof (source[p])) {
                    case 'object':
                        if (!jsCoreMethod.equals(source[p], target[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof (target[p]) == 'undefined' ||
                            (p != 'equals' && source[p].toString() != target[p].toString()))
                            return false;
                        break;
                    default:
                        if (source[p] != target[p]) {
                            return false;
                        }
                }
            } else {
                if (target[p])
                    return false;
            }
        }

        for (p in target) {
            if (typeof (source[p]) == 'undefined') {
                return false;
            }
        }

        return true;
    },
    //wap端的滚动自动加载
    autoScroll: function (cb) {
        window.onscroll = function () {
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

            var windowHeight = document.documentElement.clientHeight;
            var documentHeight = document.body.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight - 50) {
                if (cb) {
                    cb();
                }
            }
        }
    },
    //字符串截取
    cutString: function (str, num) {
        if (!str) {
            return "";
        }
        if(str.length <= num){
            return str;
        }
        return str.substring(0, num) + "...";
    },
    //设置cookie
    setCookie:function(key,val,min){
        if(!min){
            min = 999999;
        }
        var date=new Date();
        date.setTime(date.getTime()+parseInt(min)*60*1000);
        document.cookie=key+"="+val+"; expires="+date.toGMTString();
    },
    getCookie:function(key){
        if(!document.cookie){
            return "";
        }
        var res = "";
        var arr = document.cookie.split(';');
        for(var i=0;i<arr.length;i++){
            var tmp1 = arr[i].split('=')[0].trim();
            var tmp2 = arr[i].split('=')[1].trim();
            if(key == tmp1){
                res = tmp2;
                break;
            }
        }
        return res;
    },
    jqGetData:function(url,cb){
        var _index = url.indexOf('?');
        if(_index == -1){
            url = url + "?ran="+Math.ceil(Math.random()*10000000);
        }else{
            url = url + "&ran="+Math.ceil(Math.random()*10000000);
        }
        $.ajax({
            url:url,
            type:"get",
            success:function(d){
                if(cb){
                    cb(d);
                }
            }
        })
    },
    jqPostData:function(url,data,cb){

        var _url = "";
        var _data = {};
        var _cb = null;

        var argus = arguments;
        if(argus.length == 1){
            if(typeof argus[0] != "string"){
                alert("参数配置错误!");
                return;
            }
            _url = argus[0];
            _data = {};
            _cb = function(){};
        } else if(argus.length == 2){
            if(typeof argus[0] != "string" || typeof argus[1] != "function"){
                alert("参数配置错误!");
                return;
            }
            _url = argus[0];
            _data = {};
            _cb = argus[1];
        } else if(argus.length >= 3){
            _url = argus[0];
            _data = argus[1];
            _cb = argus[2];
        }else{
            alert("参数配置错误!");
            return;
        }

        var _index = _url.indexOf('?');
        if(_index == -1){
            _url = _url + "?ran="+Math.ceil(Math.random()*10000000);
        }else{
            _url = _url + "&ran="+Math.ceil(Math.random()*10000000);
        }

        $.ajax({
            url:_url,
            type:"post",
            data:_data,
            success:function(d){
                if(_cb){
                    _cb(d);
                }
            }
        })
    },
    jqJsonPGetData:function(url,paramsName,cb){
        $.ajax({
            url:url,
            type:"get",
            jsonp:paramsName,
            dataType:"jsonp",
            success:function(d){
                cb(d);
            }
        })
    },
    validateNum:function(str,msg){
        if(isNaN(str)){
            return {bl:false,msg:msg};
        }
        return {bl:true,msg:""};
    },
    validateIsNull:function(str,msg,len){
        if(!str){
            return {bl:false,msg:msg};
        }
        if(!len){
            len = 999999;
        }
        if(str && str.trim().length >0 && str.length < len){
            return {bl:true,msg:msg};
        }
        if(str.length > len){
            return {bl:false,msg:msg};
        }

        return {bl:false,msg:msg};
    },
    validateIsNullStrLen:function(str,msg,len){
        if(!len){
            len = 999999;
        }
        if(str.length > len){
            return {bl:false,msg:msg};
        }
        if(str && str.trim().length >0){
            return {bl:true,msg:""};
        }

        return {bl:false,msg:msg};
    },
    validateEmail:function(str,msg){
        var re= /\w@\w*\.\w/;
        if(re.test(str)){
            return {bl:true,msg:""};
        }
        return {bl:false,msg:msg};
    },
    validatePhone:function(str,msg){
        var re = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(re.test(str)){
            return {bl:true,msg:""};
        }
        return {bl:false,msg:msg};
    },
    validataUrl:function(str,msg){
        var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|" // a slash isn't required if there is no file name
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re=new RegExp(strRegex);

        if (re.test(str)){
            return {bl:true,msg:msg};
        }else{
            return {bl:false,msg:msg};
        }
    },
    ajaxFileUpLoadForm:function(id, cb, size,url){
        if(!size){
            size = 9999999999;
        }
        $("body").off("change","#"+id).on("change","#"+id,function(e){
            var file = e.target.files[0];
            var filesize = Math.floor(file.size)/1024;
            if(filesize > size) {
                alert("上传大小不能超过"+size+"KB");
                return false;
            }else{
                $.ajaxFileUpload({
                    url: (typeof url != "function") ? url : url(),//'/api/imageUpload/uploadJson',
                    type: 'post',
                    data: null,
                    secureuri: false,
                    fileElementId: id,
                    dataType: 'json',
                    success: function (data){
                        cb(data);
                    },
                    error: function (data, status, e){
                        alert(e);
                    }
                })
            }
        });
    },
    compress: function(source_img_obj, quality, output_format){

        var mime_type = "image/jpeg";
        if(output_format!=undefined && output_format=="png"){
            mime_type = "image/png";
        }
        var cvs = document.createElement('canvas');
        //naturalWidth真实图片的宽度
        cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
        var newImageData = cvs.toDataURL(mime_type, quality/100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
    },
    fileReader: function (id, cb, compress) {
        $("body").off("change","#"+id).on("change","#"+id,function(){
            var val = e.target.files || e.dataTransfer.files;

            for(var i=0;i<val.length;i++){
                (function(file){
                    var filereader = new FileReader();
                    var suffix = file.name.substring(file.name.indexOf('.')+1);
                    filereader.onload = function () {

                        var tempImg = $("<img />");
                        tempImg.attr("src",this.result);

                        var tmpSrc = this.result;
                        if(compress){
                            tmpsrc = jsCoreMethod.compress(tempImg.get(0),50).src;
                        }
                        jsCoreMethod.jqPostData(url,tmpSrc,function(d){
                            cb(d,file);
                        })
                    };
                    filereader.readAsDataURL(file);
                })(val[i]);
            }
        });
    },
    transformOrderStatus: function(str, status){
        var res = "";

        for(var i=0; i<status.length; i++){
            if(str == status[i].code){
                res = status[i].name;
                break;
            }
        }
        return res;
    },
    simpleUpload:function(id,url,cb){
        $("body").off("change","#"+id).on("change","#"+id,function(e){
            $.ajaxFileUpload({
                url: (typeof url != "function") ? url : url(),
                type: 'post',
                data: null,
                secureuri: false,
                fileElementId: id,
                dataType: 'json',
                success: function (data){
                    cb(data);
                },
                error: function (data, status, e){
                    alert(e);
                }
            })
        });
    },
    fileUpload:function(url,id,cb){
        $.ajaxFileUpload({
            url: url,
            type: 'post',
            data: null,
            secureuri: false,
            fileElementId: id,
            dataType: 'content',
            success: function (data){
                if(cb){
                    cb(data);
                }
            },
            error: function (data, status, e){
                alert(e);
            }
        })
    },
    fileUploadByFormAjax:function(id, beforeCb, cb, size, tag, imgSizeCb){
        $("body").off("change","#"+id).on("change","#"+id,function(e){
            var file = e.target.files[0];
            var filereader = new FileReader();
            var filesize = Math.floor(file.size)/1024;
            var suffx = file.name.substring(file.name.lastIndexOf('.')+1);

            if(tag == "image"){
                if(suffx != "jpg" && suffx != "png" && suffx != "jpeg"){
                    alert("必须上传jpg, png, jpeg的图片");
                    return;
                }

                if(imgSizeCb){
                    filereader.onload = function(){
                        var img = document.createElement('img');
                        img.setAttribute('src',this.result);
                        //$("body").append($(img));
                        //$(img).hide();

                        if(img.naturalHeight && img.naturalWidth){
                            _imgh = img.naturalHeight;
                            _imgw = img.naturalWidth;
                        } else {
                            _imgh = img.height;
                            _imgw = img.width;
                        }

                        if(imgSizeCb(_imgh, _imgw)){
                            jsCoreMethod.fileUpload();
                            //$(img).remove();
                        }
                    };
                    filereader.readAsDataURL(file);
                    return;
                }
            }
            if(tag == "pdf" ){
                if(suffx != "pdf"){
                    alert("必须上传pdf文件!");
                    return;
                }
            }
            if(tag == "excel"){
                if(suffx != "xls" && suffx != "xlsx" ){
                    alert("必须上传xls, xlsx的excel文件!");
                    return;
                }
            }
            if(tag == "zip"){
                if(suffx != "zip" && suffx!= "rar"){
                    alert("必须上传zip,rar的压缩文件!");
                    return;
                }
            }

            if(filesize > size) {
                alert("上传大小不能超过"+size+"KB");
                return false;
            }else{
                if(beforeCb){
                    beforeCb();
                }

                jsCoreMethod.fileUpload();
            }
        });
    },
    getSelectedItems:function(data){
        var res = [];
        for(var i=0;i<data.length;i++){
            if(data[i].ck){
                res.push(data[i]);
            }
        }
        return res;
    },
    setSelectAll:function(data,tag){
        for(var i=0;i<data.length;i++){
            data[i].ck = tag;
        }
    },
    setChooseOne:function(data,cb){
        var len = data.length;
        var slen = this.getSelectedItems(data).length;

        var tagAll = false;
        if(len != slen){
            tagAll = false;
        }else{
            tagAll = true;
        }
        cb(tagAll);
    },
    getCurrentLang:function(){
        var currentLang = jsCoreMethod.getCookie("lang");
        if(currentLang || currentLang == "null" || currentLang == "undefined"){
            return currentLang;
        }else{
            return "en";
        }
    },
    getCurrentDate : function(){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth()+1;
        var date = d.getDate();
        var day = d.getDay();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();
        var ms = d.getMilliseconds();
        var curDateTime= year;

        if(month>9){
            curDateTime = curDateTime +"-"+month;
        } else{
            curDateTime = curDateTime +"-0"+month;
        }
        if(date>9){
            curDateTime = curDateTime +"-"+date;
        } else{
            curDateTime = curDateTime +"-0"+date;
        }
        if(hours>9){
            curDateTime = curDateTime +" "+hours;
        } else{
            curDateTime = curDateTime +" 0"+hours;
        }
        if(minutes>9){
            curDateTime = curDateTime +":"+minutes;
        } else{
            curDateTime = curDateTime +":0"+minutes;
        }
        if(seconds>9){
            curDateTime = curDateTime +":"+seconds;
        } else{
            curDateTime = curDateTime +":0"+seconds;
        }

        return curDateTime;
    },
    getFields:function(data,field){
        var res = [];
        for(var i=0;i<data.length;i++){
            res.push(data[i][field]);
        }
        return res;
    },
    getDifferentItem:function(originArray,newArray){
        var res = [];
        for(var i =0;i<originArray.length;i++){
            var exist = false;
            for(var j=0;j<newArray.length;j++){
                if(newArray[j].toString() == newArray[i].toString()){
                    exist = true;
                    break;
                }
            }
            if(!exist){
                res.push(originArray[i].toString());
            }
        }
        return res;
    }
};

var EventPublisher = function(){

    this.eventCallbackDictionary = {};

    this.on = function(eventName,callback){
        this.eventCallbackDictionary[eventName] = callback;
    }

    this.broadcast = function(eventName,data) {
        for (var i in this.eventCallbackDictionary) {
            if (i == eventName && this.eventCallbackDictionary[eventName]) {
                this.eventCallbackDictionary[eventName](data);
                //this.eventCallbackDictionary[eventName] = null;
            }
        }
    }
}

var eventPub = new EventPublisher();