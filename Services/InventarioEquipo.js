/**
 * Created by mc185249 on 3/3/2017.
 */

let jwt = require('jsonwebtoken');
let repoEquipo = require("../Repository/Equipo");
let repoPosition = require("../Repository/Position");
let repoIncidente = require("../Repository/Incidente");
let repoSite = require("../Repository/Site");
let moment = require("moment");


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
                queries.push(repoIncidente.getAccionesIncidente());
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
        'getPosicionByIdSite': (idSite) => {
            return repoPosition.getPosicionByIdSite(idSite);
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
            let usuario = jwt.decode(token);
            form.id_user = usuario.idUser;
            return new Promise((resolve, reject) => {
                repoEquipo.UpdateEquipo(form)
                    .then(result => {
                        repoIncidente.createIncidente({
                                "autor": {
                                    id: usuario.idUser,
                                    nombre: usuario.nombreCompleto
                                },
                                "id_estado": 1,
                                "fecha_creacion": moment().format("YYYY-MM-DD HH:mm"),
                                "fecha_modificacion": null,
                                "fecha_cierre": null,
                                "data": {
                                    "id_equipo": form.idEquipo,
                                    "tipo_action": 3
                                },
                                "dataApp": 1,
                                "comentario": []
                            })
                            .then(re => resolve())
                            .catch(err => {
                                repoEquipo.cargaCancelada(form.idEquipo)
                                reject({ message: "error al crear Inicidente" })
                            })
                    })
                    .catch(err => reject(err))
            })
        },
        'newEquipo': (form, token) => {
            let usuario = jwt.decode(token);
            form.id_user = usuario.idUser;
            return new Promise((resolve, reject) => {
                repoEquipo.insertEquipo(form)
                    .then(result => {
                        repoIncidente.createIncidente({
                                "autor": {
                                    id: usuario.idUser,
                                    nombre: usuario.nombreCompleto
                                },
                                "id_estado": 1,
                                "fecha_creacion": moment().format("YYYY-MM-DD HH:mm"),
                                "fecha_modificacion": null,
                                "fecha_cierre": null,
                                "data": {
                                    "id_equipo": result.data,
                                    "tipo_action": 1
                                },
                                "dataApp": 1,
                                "comentario": []
                            })
                            .then(re => resolve())
                            .catch(err => {
                                repoEquipo.Delete_noLogico(result.data);
                                reject({ message: "error al crear Inicidente" })
                            })
                    })
                    .catch(err => reject(err))
            })
        },
        'getEquipos': (parametros, token) => {
            let idUser = jwt.decode(token).idUser;
            let idEquipo = parametros.idTipoEq == "null" ? null : parametros.idTipoEq;
            let idClient = parametros.idClient == "null" ? null : parametros.idClient;
            let idSite = parametros.idSite == "null" ? null : parametros.idSite;
            let idInstitucion = parametros.idInstitucion == "null" ? null : parametros.idInstitucion;
            let Pais = parametros.Pais == "null" ? null : parametros.Pais;
            let serie = parametros.serie == "null" ? null : parametros.serie;
            return repoEquipo.getbyFiltros(idEquipo, idClient, idInstitucion, idSite, Pais, serie, idUser)
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