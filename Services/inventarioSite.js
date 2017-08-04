/**
 * Created by mc185249 on 5/23/2017.
 */
let jwt = require('jsonwebtoken');
let repoSite = require("../Repository/Site");
let repoIncidente = require("../Repository/Incidente");
let moment = require("moment");

function Posicion() {
    return {
        'newSite': (form, token) => {
            form.idUsuario = jwt.decode(token).idUser;
            return repoSite.insertSiteClient(form)
        },

        'getSitePublicByTipoLugar': (idLugar) => {
            return repoSite.getSiteByLugar(idLugar)
        },

        'getSiteByidClient': (idClient) => {
            return repoSite.getSiteByidClientD1(idClient);
        },

        'getSiteClientByIdSite': (idSite) => {
            return repoSite.getSiteClienteIdSite(idSite)
        },

        buscarSiteByFiltro: (token) => {
            let param = {
                idUser: jwt.decode(token).idUser
            }
            return repoSite.getSiteByFilter(param)
        },

        buscarSiteById: (idSite) => {
            return new Promise((resolve, reject) => {
                repoSite.getSitebyID(idSite)
                    .then(result => {
                        let form = null;
                        if (result.length) {
                            form = {
                                id: result[0].id_site,
                                nombreSite: result[0].Nombre_Site,
                                direccion: result[0].Direccion,
                                geo: result[0].Id_geo ? { label: result[0].codigo_postal, value: result[0].Id_geo } : null,
                                geoClient: result[0].Id_geo_cliente ? { label: result[0].zona1, value: result[0].Id_geo_cliente } : null,
                                idClient: result[0].Id_cliente ? { label: result[0].cliente_d1, value: result[0].Id_cliente } : null,
                                latitud: result[0].latitud,
                                longitud: result[0].longitud,
                                offset: result[0].offset,
                                telefono1: result[0].telefono1,
                                telefono2: result[0].telefono2,
                                telefono3: result[0].telefono3,
                                pais: result[0].pais ? { label: result[0].pais, value: result[0].pais } : null,
                                estado: result[0].estado ? { label: result[0].estado, value: result[0].estado } : null,
                                ciudad: result[0].ciudad ? { label: result[0].ciudad, value: result[0].ciudad } : null,
                                Lugar: result[0].Id_Tipo_Lugar ? { label: result[0].tipo_direccion, value: result[0].Id_Tipo_Lugar } : null,
                                SitePublic: result[0].Nombre_Site,
                                siteCountryCode: result[0].site_country_code
                            }
                        }
                        resolve(form);
                    })
                    .catch(err => reject(err))
            })
        },

        updateSite: (form, token) => {
            return new Promise((resolve, reject) => {
                let usuario = jwt.decode(token);
                form.idUsuario = usuario.idUser;
                repoSite.updateSite(form)
                    .then(result => {
                        if (result.data) {
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
                                        "id_site": form.id_site,
                                        "tipo_action": 9
                                    },
                                    "dataApp": 1,
                                    "comentario": []
                                })
                                .then(re => resolve(result.data))
                                .catch(err => {
                                    reject({ message: "error al crear Inicidente" })
                                })
                        } else {
                            resolve(result.data)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /* */

        updateCorreccion: (form, token, idTicket) => {
            return new Promise((resolve, reject) => {
                let usuario = jwt.decode(token);
                form.idUsuario = usuario.idUser;
                repoSite.updateSite(form)
                    .then(result => {
                        repoIncidente.changeState({
                                id: idTicket,
                                id_estado: 1,
                                comentario: ""
                            })
                            .then(re => resolve())
                            .catch(err => reject({ message: "error al crear Inicidente" }))
                    })
                    .catch(err => reject(err))
            })
        }

    }
}

module.exports = Posicion();