/**
 * Created by mc185249 on 3/16/2017.
 */
let axios = require("axios");

class PositionRepository {
    constructor() {
        this.DB = require("./DB/SqlServer");
    }
}

PositionRepository.prototype.insertPosition = function(formulario) {
    return axios.post('http://lnxsrv02:3001/', formulario)
};

PositionRepository.prototype.deletePosicion = function(idPosicion, idUser) {
    return axios.delete(`http://lnxsrv02:3001/${idUser}/${idPosicion}`)
};

PositionRepository.prototype.UpdatePosicion = function(formulario) {
    return axios.patch(`http://lnxsrv02:3001:3001/`, formulario)
};

PositionRepository.prototype.AprobarCarga = function(idPosicion) {
    //sp_Aprobacion_Carga_Posicion
    let parametros = {
        idPosicion: {
            Value: id,
            Type: "Int"
        }
    }
    return new this.DB().procedure('sp_Aprobacion_Carga_Posicion', parametros)
}

PositionRepository.prototype.BuscarPosicionbyFiltro = function(Filtro) {
    //sp_Buscar_Posicion
    let parametros = {
        cliente: {
            Value: Filtro.cliente,
            Type: "VarChar"
        },
        site: {
            Value: Filtro.site,
            Type: "VarChar"
        },
        nombrePosicion: {
            Value: Filtro.nombrePosicion,
            Type: "VarChar"
        },
        tipo_site: {
            Value: Filtro.tipo_site,
            Type: "VarChar"
        },
        idUsuario: {
            Value: Filtro.idUsuario,
            Type: "VarChar"
        }
    }
    return new this.DB().procedure('sp_Buscar_Posicion', parametros)
};

PositionRepository.prototype.buscarPosicionById = function(idPosicion) {
    let parametros = {
        idPosicion: {
            Value: idPosicion,
            Type: "Int"
        }
    }
    return new Promise((resolve, reject) => {
        new this.DB().procedure('sp_Buscar_Posicion_byID', parametros)
            .then(result => {
                if (!result.length) return resolve(null)
                let posicion = {
                    id: result[0].id,
                    nombrePoscion: result[0].cliente_id,
                    ncr: result[0].ncr_id,
                    ip: result[0].ip,
                    site: result[0].id_site ? { label: result[0].Nombre_Site, value: result[0].id_site } : null,
                    config_gavetas: result[0].id_config_gavetas ? { label: result[0].configuracion, value: result[0].id_config_gavetas } : null,
                    tabla_status: result[0].id_tabla_status ? { label: result[0].descripcion, value: result[0].id_tabla_status } : null,
                    script: result[0].id_script ? { label: result[0].script, value: result[0].id_script } : null,
                    command: result[0].id_command ? { label: result[0].command, value: result[0].id_command } : null,
                    community_string: result[0].id_community_string ? { label: result[0].community_string, value: result[0].id_community_string } : null,
                    comunicacion: result[0].id_comunicacion ? { label: result[0].tipo_enlace, value: result[0].id_comunicacion } : null,
                    slm: result[0].id_slm ? { label: result[0].slm, value: result[0].id_slm } : null,
                    flm: result[0].id_flm ? { label: result[0].flm, value: result[0].id_flm } : null,
                    ubicacion_en_site: result[0].id_ubicacion_en_site ? { label: result[0].ubicacion, value: result[0].id_ubicacion_en_site } : null,
                    id_tipo_Site: result[0].id_tipo_site ? { label: result[0].tipoSite, value: result[0].id_tipo_site } : null,
                    cliente: result[0].id_cliente ? { label: result[0].cliente_d1, value: result[0].id_cliente } : null
                }
                resolve(posicion);
            })
            .catch(err => reject(err))
    })
}

PositionRepository.prototype.getPosicionByIdSite = function(idSite) {
    return new this.DB().executeQuery(`SELECT id as value,cliente_id as label from inv_posicion where id_site=${idSite}`)
};

PositionRepository.prototype.getGavetas = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT configuracion as label,id as value from configuracion_gavetas`)
            .then((result) => {
                resolve({ gavetas: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getTablaStatus = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT descripcion as label, id as value from tabla_status`)
            .then((result) => {
                resolve({ tablaStatus: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getCommandScript = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT command as label, id as value from command_script`)
            .then((result) => {
                resolve({ commandScript: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getCallingScript = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT script as label, id as value FROM calling_script`)
            .then((result) => {
                resolve({ callingScript: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getCommunity = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select ISNULL(descripcion,'') + ' - ' + ISNULL(COMMUNITY,'') as label, id as value from community_string`)
            .then((result) => {
                resolve({ community: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getComunicacion = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT id as value,tipo_enlace as label from comunicacion`)
            .then((result) => {
                resolve({ comunicacion: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getSLM = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT id as value,slm as label from slm`)
            .then((result) => {
                resolve({ slm: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getFLM = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT id as value,flm as label from flm`)
            .then((result) => {
                resolve({ flm: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getPrestacion = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT id as value, prestacion as label from prestacion`)
            .then((result) => {
                resolve({ prestacion: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getUbicacionSite = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT id as value,ubicacion as label from ubicacion_en_site`)
            .then((result) => {
                resolve({ ubicacionSite: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getTypeHora = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT id as value,nombre as label FROM ventana_horaria`)
            .then((result) => {
                resolve({ TypeHora: result })
            })
            .catch((err) => {
                reject(err)
            })
    })
};

PositionRepository.prototype.getHorasPrestacionByEquipoID = function(id) {
    let parametros = {
        idEquipo: {
            Value: id,
            Type: "Int"
        }
    }

    return new Promise((resolve, reject) => {
        new this.DB().procedure('sp_Prestacion_EquipoId', parametros)
            .then(result => {
                let ventanaHorarias = {};
                //formatiamos la data
                result.forEach((item) => {
                    let existe = ventanaHorarias[item.idVentana];
                    if (existe) {
                        existe.push({
                            dias: parseDia(item.dia),
                            minFin: item.minFin,
                            minInt: item.minIni
                        })
                    } else {
                        ventanaHorarias[item.idVentana] = [{
                            dias: parseDia(item.dia),
                            minFin: item.minFin,
                            minInt: item.minIni
                        }]
                    }
                });
                //agrupamos los horarios
                for (let idVentana in ventanaHorarias) {
                    ventanaHorarias[idVentana] = agrupar(ventanaHorarias[idVentana])
                }
                let arrayAux = [];
                for (let attr in ventanaHorarias) {
                    arrayAux.push({
                        idHora: parseInt(attr, 10),
                        hora: ventanaHorarias[attr]
                    })
                }
                //formatemoas
                resolve(arrayAux)
            })
            .catch(err => reject(err))
    })
}

PositionRepository.prototype.getHorarios = function(id) {
    let parametros = {
        idPosicion: {
            Value: id,
            Type: "Int"
        }
    }

    return new Promise((resolve, reject) => {
        new this.DB().procedure('sp_Horarios_by_posicion', parametros)
            .then(result => {
                let ventanaHorarias = {};
                //formatiamos la data
                result.forEach((item) => {
                    let existe = ventanaHorarias[item.idVentana];
                    if (existe) {
                        existe.push({
                            dias: parseDia(item.dia),
                            minFin: item.minFin,
                            minInt: item.minIni
                        })
                    } else {
                        ventanaHorarias[item.idVentana] = [{
                            dias: parseDia(item.dia),
                            minFin: item.minFin,
                            minInt: item.minIni
                        }]
                    }
                });
                //agrupamos los horarios
                for (let idVentana in ventanaHorarias) {
                    ventanaHorarias[idVentana] = agrupar(ventanaHorarias[idVentana])
                }
                let arrayAux = [];
                for (let attr in ventanaHorarias) {
                    arrayAux.push({
                        idHora: parseInt(attr, 10),
                        hora: ventanaHorarias[attr]
                    })
                }
                //formatemoas
                resolve(arrayAux)
            })
            .catch(err => reject(err))
    })
}

function parseDia(numDia) {
    if (numDia == 1) {
        return 6;
    } else {
        return numDia - 2;
    }
}

function getDiaSiguente(arrayDias) {
    let x = (arrayDias[arrayDias.length - 1] + 1)
    return x > 6 ? 0 : x;
}

function agrupar(ventanaHoraria) {
    //agrupamos
    let itemAnterior = ventanaHoraria[0]
    ventanaHoraria.forEach((item, index, list) => {
            if (!index) {
                item.dias = [item.dias]
            } else {
                //verificamos min inicio y min fin coincide con el anterior y que sea un dia siguiente
                if (item.minInt == itemAnterior.minInt && item.minFin == itemAnterior.minFin && item.dias == getDiaSiguente(itemAnterior.dias)) {
                    itemAnterior.dias.push(item.dias);
                    //lo marcamos para borrar
                    list[index] = null;
                } else {
                    //lo cargamos como el anterior prar la proxima comparacion
                    item.dias = [item.dias]
                    itemAnterior = item;
                }
            }
        })
        //limpiamos
    ventanaHoraria = ventanaHoraria.filter(item => item);
    //ordenar por dias
    ventanaHoraria = ventanaHoraria.sort((a, b) => { return a.dias[0] - b.dias[0] });
    return ventanaHoraria;
}

module.exports = new PositionRepository();