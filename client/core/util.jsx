
export default class Util{
    //constructor(a) {
    //    super(a);
    //}

    //获取对象的属性, 参数为数组，必须保证数组里面对象的属性完整
    static getProperties(arr){
        var res = [];
        if(!arr || arr.length == 0){
            return res;
        }
        for(var i in arr[0]){
            res.push(i);
        }
        return res;
    }

    //send ajax
    static fetchAjax(url,method,data){
        var _url = url;
        if(typeof url == "function"){
            _url = url();
        }
        if(_url.indexOf('?') == -1){
            _url = url + "?ran="+Math.random();
        }else{
            _url = url+ "&ran="+Math.random();
        }

        var options = {};
        //headers: {
        //    'Accept': 'application/json',
        //        'Content-Type': 'application/json'
        //},
        if(method.toLowerCase() == "get"){
            options = {
                method:"GET",
                credentials:'include'
            };
        }
        if(method.toLowerCase() == "post"){
            options = {
                method:"POST",
                credentials:'include'
            };
            if(data){
                options.body = JSON.stringify(data);
            }
        }

        return fetch(_url, options).then(d =>d.json());
    }

    //深度clone对象
    static cloneObj(source){
        if(source){
            return JSON.parse(JSON.stringify(source));
        }
        return null;
    }

    //根据主键获取当前对象(数组),主键key为__tmpId
    static getArrayByTmpIds(ids,data){
        var res = [];
        var tmp = data;
        ids.map(id=>{
            tmp.map(k=>{
                if(k.__tmpId == id){
                    res.push(k);
                }
            })
        })
        return res;
    }

    //获取数组某属性的集合
    static getArrayByField(field,arr){
        var res = [];
        arr.map(function(item){
            if(item[field]){
                res.push(item[field]);
            }
        })
        return res;
    }

    //添加ck和主键(__tmpId)属性,ck为可选项
    static addPrimaryAndCk(data,ck){
        data.map(item=>{
            if(ck){
                item.ck = false;
            }
            item.__tmpId = Math.ceil(Math.random()*10000000000000000);
        });
        return data;
    }
}