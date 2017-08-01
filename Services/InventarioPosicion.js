/**
 * Created by mc185249 on 4/5/2017.
 */
let jwt = require('jsonwebtoken');
let repoPosition = require("../Repository/Position");
let repoIncidente = require("../Repository/Incidente");
let moment = require('moment')

function Posicion() {
    return {
        'newPosicion': (form, token) => {
            form.iduser = jwt.decode(token).idUser;
            return repoPosition.insertPosition(form)
        },

        updatePosicion: (form, token) => {
            return new Promise((resolve, reject) => {
                let usuario = jwt.decode(token);
                form.iduser = usuario.idUser;
                repoPosition.UpdatePosicion(form)
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
                                    "id_posicion": form.id_position,
                                    "tipo_action": 6
                                },
                                "dataApp": 1,
                                "comentario": []
                            })
                            .then(re => resolve())
                            .catch(err => {
                                //repoEquipo.cargaCancelada(form.idEquipo)
                                reject({ message: "error al crear Inicidente" })
                            })
                    })
                    .catch(err => reject(err))
            })
        },

        updatePosicionSinIncidente: (form, token, idTicket) => {
            return new Promise((resolve, reject) => {
                let usuario = jwt.decode(token);
                form.iduser = usuario.idUser;
                repoPosition.UpdatePosicion(form)
                    .then(result => {
                        repoIncidente.changeState({
                                id: idTicket,
                                id_estado: 1,
                                comentario: ""
                            })
                            .then(re => resolve())
                            .catch(err => {
                                //repoEquipo.cargaCancelada(form.idEquipo)
                                reject({ message: "error al crear Inicidente" })
                            })
                    })
                    .catch(err => reject(err))
            })
        },

        'getPosicionByIdSite': (idSite) => {
            return repoPosition.getPosicionByIdSite(idSite);
        },

        getPosicionByFiltro: (param, token) => {
            let Filtro = {
                cliente: param.cliente == "null" ? null : param.cliente,
                site: param.site == "null" ? null : param.site,
                nombrePosicion: param.nombrePosicion == "null" ? null : param.nombrePosicion,
                tipo_site: param.tipoSite == "null" ? null : param.tipoSite,
                idUsuario: jwt.decode(token).idUser
            }
            return repoPosition.BuscarPosicionbyFiltro(Filtro)
        },

        getPosicionbyId: (idPosicion) => {
            return new Promise((resolve, reject) => {
                Promise.all([repoPosition.buscarPosicionById(idPosicion), repoPosition.getHorarios(idPosicion)])
                    .then(result => {
                        if (result[0]) {
                            result[0]["Horarios"] = result[1];
                        }
                        resolve(result[0])
                    })
                    .catch(err => reject(err))
            })
        }

    }
}

module.exports = Posicion;