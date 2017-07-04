/**
 * Created by mc185249 on 3/3/2017.
 */

let jwt = require('jsonwebtoken');
let repoEquipo = require("../Repository/Equipo");
let repoPosition = require("../Repository/Position");
let repoSite = require("../Repository/Site");


function Equipo() {
    return {
        'getSource': () => {
            return new Promise((resolve, reject) => {
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
                Promise.all(queries).then((value) => {
                    var result = {};
                    value.map((a) => {
                        for (let attr in a) {
                            if (a.hasOwnProperty(attr)) result[attr] = a[attr]
                        }
                    });
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                })
            })
        },
        'getSiteByidClient': (idClient) => {
            return repoSite.getSiteByidClientD1(idClient);
        },
        'getSiteClientByIdSite': (idSite) => {
            return repoSite.getSiteClienteIdSite(idSite)
        },
        'getPosicionByIdSite': (idSite) => {
            return repoPosition.getPosicionByIdSite(idSite);
        },
        'getEquipoByIdSiteClient': (idSiteClient) => {
            return repoEquipo.getEquipoByIdSiteClient(idSiteClient);
        },
        'getPrestacionEquipo': (idEquipo) => {
            return repoEquipo.getPrestacionByIdEquipo(idEquipo);
        },
        'getEstado': (pais) => {
            return repoSite.getEstado(pais);
        },
        'getCiudad': (pais, estado) => {
            return repoSite.getCiudad(pais, estado);
        },
        'getCodigoPostal': (pais, estado, ciudad) => {
            return repoSite.getCodigoPostal(pais, estado, ciudad);
        },
        'UpdateEquipo_Test': (form, token) => {
            let idUser = jwt.decode(token).idUser;
            if (form.newPosicion) {
                return new Promise((resolve, reject) => {
                    let formPosicion = form.newPosicion;
                    //le insertamos las prestaciones y el idUsuario
                    formPosicion.HoraPrestacion = form.horaPrestacion;
                    formPosicion.iduser = idUser;
                    //1 insertamos primero la posicion
                    repoPosition.insertPosition(formPosicion)
                        .then((result) => {
                            //2 obtenemos el id de la nueva posicion
                            form.id_user = idUser; //idUser;
                            form.id_posicion = result.data;
                            //insertamos el nuevo equipo con la posicion
                            repoEquipo.UpdateEquipo(form)
                                .then(() => { resolve() })
                                .catch((err) => {
                                    repoPosition.deletePosicion(result.data, idUser)
                                        .catch(err => console.log(err));
                                    reject(err);
                                })
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            } else {
                //eliminamos la New Posicion y enviamos
                form.id_user = idUser;
                delete form.newPosicion;
                return repoEquipo.UpdateEquipo(form);
            }
        },
        'newEquipo': (form, token) => {
            let idUser = jwt.decode(token).idUser;
            if (form.newPosicion) {
                return new Promise((resolve, reject) => {
                    let formPosicion = form.newPosicion;
                    //le insertamos las prestaciones y el idUsuario
                    formPosicion.HoraPrestacion = form.horaPrestacion;
                    formPosicion.iduser = idUser;
                    //1 insertamos primero la posicion
                    repoPosition.insertPosition(formPosicion)
                        .then((result) => {
                            //2 obtenemos el id de la nueva posicion
                            form.id_user = idUser;
                            form.id_posicion = result.data;
                            //insertamos el nuevo equipo con la posicion
                            repoEquipo.insertEquipo(form)
                                .then(() => { resolve() })
                                .catch((err) => {
                                    //en caso de fallar elminar la posicion creada
                                    repoPosition.deletePosicion(idUser, form.id_posicion)
                                        .then(result => { console.log(result) })
                                        .catch(err => { console.log(err) })
                                    reject(err);
                                })
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            } else {
                //eliminamos la New Posicion y enviamos
                form.id_user = idUser;
                delete form.newPosicion;
                return repoEquipo.insertEquipo(form);
            }
        },
        'getEquipos': (parametros) => {
            let idEquipo = parametros.idTipoEq == "null" ? null : parametros.idTipoEq;
            let idClient = parametros.idClient == "null" ? null : parametros.idClient;
            let idSite = parametros.idSite == "null" ? null : parametros.idSite;
            let idInstitucion = parametros.idInstitucion == "null" ? null : parametros.idInstitucion;
            let Pais = parametros.Pais == "null" ? null : parametros.Pais;
            let serie = parametros.serie == "null" ? null : parametros.serie;
            return repoEquipo.getbyFiltros(idEquipo, idClient, idInstitucion, idSite, Pais, serie)
        },
        'getEquipoById': (idEquipo) => {
            return new Promise((resolve, reject) => {
                let arrayPromise = []
                arrayPromise.push(repoEquipo.getByIdEquipo(idEquipo))
                arrayPromise.push(repoPosition.getHorasPrestacionByEquipoID(idEquipo))
                Promise.all(arrayPromise)
                    .then(result => {
                        let equipo = result[0];
                        if (equipo) { equipo.prestacion = result[1] }
                        resolve(equipo);
                    })
                    .then(err => reject(err))
            })
        },
        'DeleteEquipo': (id, token) => {
            let idUser = jwt.decode(token).idUser;
            return repoEquipo.Delete(id, idUser)
        }

    }
}

module.exports = Equipo;