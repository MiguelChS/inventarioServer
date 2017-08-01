var repoInicidente = require("../Repository/Incidente");
var repoEquipo = require("../Repository/Equipo");
let jwt = require('jsonwebtoken');

module.exports = {
    getInicidente: () => {
        return new Promise((resolve, reject) => {
            repoInicidente.getIncidente()
                .then(result => resolve(result.data))
                .catch(err => reject(err))
        })
    },

    getState: () => {
        return new Promise((resolve, reject) => {
            repoInicidente.getState()
                .then(result => resolve(result.data))
                .catch(err => reject(err))
        })
    },

    changeStateIncidente: (data, token) => {
        return new Promise((resolve, reject) => {
            let usuario = jwt.decode(token);
            repoInicidente.changeState(Object.assign({}, data, { autor: { id: usuario.idUser, nombre: usuario.nombreCompleto } }))
                .then(result => {
                    switch (data.id_estado) {
                        case 4:
                            {
                                //carga aprobada
                                return repoEquipo.CargaAprobada(data.idEquipo)
                            }
                        case 5:
                            {
                                //volver atras la info o eliminar lo creado
                                return repoEquipo.cargaCancelada(data.idEquipo);
                            }
                        default:
                            {
                                return new Promise((resolve) => resolve())
                            }

                    }
                })
                .then(re => resolve())
                .catch(err => reject(err))
        })
    },

    getIncidenteByUser: (token) => {
        return new Promise((resolve, reject) => {
            let idUser = jwt.decode(token).idUser;
            repoInicidente.getIncidenteByUser(idUser)
                .then(result => resolve(result.data))
                .catch(err => reject(err))
        })
    },

    getAction: () => {
        return repoInicidente.getAccionesIncidente();
    }

}