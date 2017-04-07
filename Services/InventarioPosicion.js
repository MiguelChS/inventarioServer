/**
 * Created by mc185249 on 4/5/2017.
 */
let repoPosition = require("../Repository/Position");

function Posicion(){
    return {
        'getSource':()=>{
            return new Promise((resolve,reject)=>{
                let queries = [];
                queries.push(repoPosition.getGavetas());
                queries.push(repoPosition.getTablaStatus());
                queries.push(repoPosition.getCommandScript());
                queries.push(repoPosition.getCallingScript());
                queries.push(repoPosition.getCommunity());
                queries.push(repoPosition.getComunicacion());
                queries.push(repoPosition.getSLM());
                queries.push(repoPosition.getFLM());
                queries.push(repoPosition.getPrestacion());
                queries.push(repoPosition.getUbicacionSite());
                Promise.all(queries).then((value)=>{
                    var result = {};
                    value.map((a)=>{
                        for(let attr in a){
                            if(a.hasOwnProperty(attr))result[attr] = a[attr]
                        }
                    });
                    resolve(result);
                }).catch((err)=>{
                    reject(err);
                })
            })
        }
    }
}

module.exports = Posicion;