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
                queries.push(repoEquipo.getEquipos());
                queries.push(repoEquipo.getlistMarca());
                queries.push(repoEquipo.getPlanta());
                queries.push(repoEquipo.getCarga());
                queries.push(repoEquipo.getSnmp());
                queries.push(repoEquipo.getSO());
                queries.push(repoEquipo.getXFS());
                queries.push(repoEquipo.getEstado());
                queries.push(repoEquipo.getListModelo());
                queries.push(repoEquipo.getTipoEquipo());
                queries.push(repoEquipo.getModulosEquipo());
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
                queries.push(repoPosition.getTypeHora());
                queries.push(repoSite.getTipoSite());
                queries.push(repoSite.getGeoClient());
                queries.push(repoSite.getPais());
                queries.push(repoSite.getGeoNcr());
                queries.push(repoSite.getTipoDirecion());
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
        'getSiteByidClient':(idClient,origen)=>{
            return new Promise((resolve,reject)=>{
                if(origen == 2){
                    repoSite.getSiteByInstitucion(idClient)
                        .then((result)=>{
                            resolve(result);
                        })
                        .catch((err)=>{
                            reject(err);
                        })
                }else{
                    repoSite.getSiteByidClientD1(idClient)
                        .then((result)=>{
                            resolve(result);
                        })
                        .catch((err)=>{
                            reject(err);
                        })
                }
            });
        },
        'getSiteClientByIdSite':(idSite)=>{
            return repoSite.getSiteClienteIdSite(idSite)
        },
        'getPosicionByIdSiteClient':(idSiteClient)=>{
            return repoPosition.getPositionByIdSiteClient(idSiteClient);
        },
        'getEquipoByIdSiteClient':(idSiteClient)=>{
            return repoEquipo.getEquipoByIdSiteClient(idSiteClient);
        },
        'getPrestacionEquipo':(idEquipo)=>{
            return repoEquipo.getPrestacionByIdEquipo(idEquipo);
        },
        'getEstado':(pais)=>{
            return repoSite.getEstado(pais);
        },
        'getCiudad':(pais,estado)=>{
            return repoSite.getCiudad(pais,estado);
        },
        'getCodigoPostal':(pais,estado,ciudad)=>{
            return repoSite.getCodigoPostal(pais,estado,ciudad);
        }

    }
}

module.exports = Equipo;