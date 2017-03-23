/**
 * Created by mc185249 on 3/3/2017.
 */

let repoEquipo = require("../Repository/Equipo");
let repoPosition = require("../Repository/Position");
let repoSite = require("../Repository/Site");

function Equipo(){
    return {
        'getSource':()=>{
            return new Promise((resolve,reject)=>{
                let queries = [];
                queries.push(repoEquipo.getlistMarca());
                queries.push(repoEquipo.getPlanta());
                queries.push(repoEquipo.getCarga());
                queries.push(repoEquipo.getGarantia());
                queries.push(repoEquipo.getSnmp());
                queries.push(repoEquipo.getSO());
                queries.push(repoEquipo.getXFS());
                queries.push(repoEquipo.getEstado());
                queries.push(repoEquipo.getListModelo());
                queries.push(repoEquipo.getTipoEquipo());
                queries.push(repoEquipo.getModulosEquipo());
                queries.push(repoEquipo.getEquipos());
                queries.push(repoPosition.getPosition());
                queries.push(repoSite.getSite());
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
        },
        'InsertEquipo':(data)=>{
            //verificar cual de todos los equipos tiene asignado posicion

            //verificar si esas posicion tiene un equipo asignado

            //en caso de tenerlo darlo de baja y asignarlo a una posicion deposito

        }

    }
}

module.exports = Equipo;