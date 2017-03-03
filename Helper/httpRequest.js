/**
 * Created by mc185249 on 2/23/2017.
 */
let http = require("http");

function Enviar(dataJson) {
    return new Promise((resolve,reject)=>{
        let option = {
            hostname: "lnxsrv02",
            path: "/ocpu/library/wordCloudApi/R/wordCloud/json",
            method: "POST",
            port:"8000",
            headers: {
                'Content-Type': "application/json"
            }
        };
        let reqGet = http.request(option, function(res) {
            let result = "";
            res.setEncoding('utf8');
            res.on('data', function(data) {
                result += data;
            });
            res.on('end', function() {
                resolve({
                    responseCode:res.statusCode,
                    result:result
                });
            });
        });

        reqGet.on('error', function(e) {
            reject(e);
        });
        reqGet.end(JSON.stringify(dataJson));
    });
}

module.exports = Enviar;