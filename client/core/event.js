var EventPublisher = function(){

    this.eventCallbackDictionary = {};

    this.on = function(eventName,callback){
        this.eventCallbackDictionary[eventName] = callback;
    }

    this.broadcast = function(eventName,data){
        for(var i in this.eventCallbackDictionary){
            if(i == eventName && this.eventCallbackDictionary[eventName]){
                this.eventCallbackDictionary[eventName](data);
                //this.eventCallbackDictionary[eventName] = null;
            }
        }
    }

    this.dataPools = {};

    this.set = function(flag,data){
        this.dataPools[flag] = data;
    }

    this.get = function(flag,callback){
        for(var i in this.dataPools){
            if(i == flag && this.dataPools[flag]){
                callback(this.dataPools[flag]);
                this.dataPools[flag] = null;
            }
        }
    }
}