/**
 * Created by wupeng5 on 2017/7/19.
 */

'use strict';

var http = require('http');

var utils = function(){

    this.httpRequest = function(url,parmas,method,certificate,callback){
        //var user = {
        //    username: 'The Reddest',
        //    password: 'cc2'
        //};
        if(!parmas){
            parmas = {};
        }
        parmas.__from = "huanche";

        var userString = JSON.stringify(parmas);//.toString("utf8");

        var headers = {};

        if(certificate){
            var auth = 'Basic ' + new Buffer(certificate.username + ':' + certificate.password).toString('base64');
            headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Content-Length': Buffer.byteLength(userString),//userString.length,
                'Authorization': auth
            };
        }else{
            headers = {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(userString)
            };
        }

        var options = {
            host: '123.56.44.159',//'123.56.44.159',//123.57.133.126:3008
            port: 3008,
            path: url,
            method: method,
            headers: headers
        };

        var req = http.request(options, function(res) {
            res.setEncoding('utf-8');

            var responseString = '';

            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function() {
                console.log(responseString,"responseString");
                var resultObject = JSON.parse(responseString);
                callback(null,resultObject);
            });
        });

        req.on('error', function(e) {
            //console.log('error!');
            callback(e,null);
        });

        req.write(userString);
        req.end();
    }
}

module.exports = new utils();