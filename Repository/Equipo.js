/**
 * Created by mc185249 on 3/3/2017.
 */
let axios = require("axios");
let moment = require("moment");

class EquipoRepository {
    constructor() {
        this.DB = require("./DB/SqlServer");
    }
}

EquipoRepository.prototype.CargaAprobada = function(id) {
    let parametros = {
        idEquipo: {
            Value: id,
            Type: "Int"
        }
    }
    return new this.DB().procedure('sp_Aprobacion_Carga_Equipo', parametros)
}

EquipoRepository.prototype.cargaCancelada = function(id) {
    let parametros = {
        idEquipo: {
            Value: id,
            Type: "Int"
        }
    };
    return new this.DB().procedure('sp_Carga_Cancelada_Equipo', parametros);
}

EquipoRepository.prototype.insertEquipo = function(formulario) {
    //lnxsrv02
    //153.72.43.133
    return axios.post('http://lnxsrv02:3000/', formulario)
};

EquipoRepository.prototype.UpdateEquipo = function(formulario) {
    return axios.patch(`http://lnxsrv02:3000/${formulario.idEquipo}`, formulario)
};

EquipoRepository.prototype.Delete = function(id, idUser) {
    return axios.delete(`http://lnxsrv02:3000/${idUser}/${id}`)
};

EquipoRepository.prototype.Delete_noLogico = function(id) {
    let parametros = {
        id: {
            Value: id,
            Type: "Int"
        }
    }
    return new this.DB().procedure('sp_Delete_inv_equipo_no_logico', parametros)
}

EquipoRepository.prototype.getbyFiltros = function(idEquipo, idClient, idInstitucion, idSite, Pais, serie, idUser) {
    let parametros = {
        Pais: {
            Value: Pais,
            Type: "VarChar"
        },
        idCliente: {
            Value: idClient,
            Type: "VarChar"
        },
        idInstitucion: {
            Value: idInstitucion,
            Type: "VarChar"
        },
        idTipoEquipo: {
            Value: idEquipo,
            Type: "VarChar"
        },
        idSite: {
            Value: idSite,
            Type: "VarChar"
        },
        serie: {
            Value: serie,
            Type: "VarChar"
        },
        idUsuario: {
            Value: idUser,
            Type: "VarChar"
        }
    }
    return new this.DB().procedure('sp_Busco_Equipos', parametros)
};

EquipoRepository.prototype.getByIdEquipo = function(id) {
    let parametros = {
        idEquipo: {
            Value: id,
            Type: "Int"
        }
    }
    return new Promise((resolve, reject) => {
        new this.DB().procedure('sp_Buscar_Equipo_byId', parametros)
            .then(result => {
                let equipo = {
                    planta: null,
                    serie: null,
                    modelo: null,
                    carga: null,
                    snmp: null,
                    so: null,
                    xfs: null,
                    f_garantia: null,
                    f_instalacion: null,
                    f_retiro: null,
                    f_entrega: null,
                    institucion: null,
                    cliente: null,
                    estado: null,
                    tipoEquipo: null,
                    tipoEq: null,
                    marca: null,
                    position: null,
                    site: null,
                    modulos: []
                };
                result.forEach((item, index) => {
                    if (index == 0) {
                        equipo.planta = item.id_planta;
                        equipo.serie = item.nro_serie;
                        equipo.modelo = item.id_modelo;
                        equipo.carga = item.id_carga;
                        equipo.snmp = item.id_snmp;
                        equipo.so = item.id_SO;
                        equipo.xfs = item.id_xfs;
                        equipo.f_garantia = item.f_fin_garantia ? moment.utc(item.f_fin_garantia).format("YYYY-MM-DD") : null;
                        equipo.f_instalacion = item.f_inst ? moment.utc(item.f_inst).format("YYYY-MM-DD") : null;
                        equipo.f_retiro = item.f_retiro ? moment.utc(item.f_retiro).format("YYYY-MM-DD") : null;
                        equipo.f_entrega = item.f_entrega ? moment.utc(item.f_entrega).format("YYYY-MM-DD") : null;
                        equipo.institucion = item.id_institucion;
                        equipo.cliente = item.Id_cliente;
                        equipo.estado = item.id_estado;
                        equipo.tipoEq = item.id_tipo_eq;
                        equipo.tipoEquipo = item.id_tipo_equipo;
                        equipo.marca = item.id_marca;
                        equipo.modulos = item.id_modulo ? [item.id_modulo] : [];
                        equipo.position = {
                            value: item.idPosicion,
                            label: item.textPosicion
                        }
                        equipo.site = {
                            value: item.idSite,
                            label: item.textSite
                        }
                    } else {
                        if (item.id_modulo) {
                            equipo.modulos.push(item.id_modulo);
                        }
                    }
                });
                resolve(result.length ? equipo : null)
            })
            .catch(err => {
                reject(err)
            })
    })
}

EquipoRepository.prototype.getlistMarca = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select  id as value, marca as label from marca`)
            .then((result) => {
                resolve({ marcas: result })
            })
            .catch((err) => {
                reject(err)
            })
    });
};

EquipoRepository.prototype.getEquipos = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select id as value, tipo_equipo as label from tipo_equipo where id <> 2`)
            .then((result) => {
                resolve({ Equipos: result })
            })
            .catch((err) => {
                reject(err)
            })
    });
};

EquipoRepository.prototype.getTipoEquipo = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select id as value, tipo_equipo as label,id_tipo_equipo as idEquipo from tipo_eq`)
            .then((result) => {
                let resultAgrupado = {};
                for (let i = 0; i < result.length; i++) {
                    let obj = result[i];
                    if (resultAgrupado.hasOwnProperty(obj.idEquipo)) {
                        resultAgrupado[obj.idEquipo].push(obj);
                    } else {
                        let attr = obj.idEquipo ? obj.idEquipo : "generico";
                        resultAgrupado[attr] = [obj];
                    }
                }
                resolve({ tipoEquipo: resultAgrupado })
            })
            .catch((err) => {
                reject(err)
            })
    });
};

EquipoRepository.prototype.getPlanta = function() {
    return new Promise((resolve, reject) => {
        new this.DB().queryStream(`select id as value, CONCAT(planta,' - ',prefijo) as label,prefijo,id_marca as idMarca from planta;`)
            .then((result) => {
                let resultAgrupado = {};
                for (let i = 0; i < result.length; i++) {
                    let obj = result[i];
                    if (resultAgrupado.hasOwnProperty(obj.idMarca)) {
                        resultAgrupado[obj.idMarca].push(obj);
                    } else {
                        let attr = obj.idMarca ? obj.idMarca : "generico";
                        resultAgrupado[attr] = [obj];
                    }
                }
                resolve({ planta: resultAgrupado });
            })
            .catch((err) => {
                reject(err)
            })
    })
};

EquipoRepository.prototype.getListModelo = function() {
    return new Promise((resolve, reject) => {
        new this.DB().queryStream(`select id as value, modelo as label, id_marca as idMarca from modelo`)
            .then((result) => {
                //agrupar por marca
                let resultAgrupado = {};
                for (let i = 0; i < result.length; i++) {
                    let obj = result[i];
                    if (resultAgrupado.hasOwnProperty(obj.idMarca)) {
                        resultAgrupado[obj.idMarca].push(obj);
                    } else {
                        resultAgrupado[obj.idMarca] = [obj];
                    }
                }
                resolve({ modelo: resultAgrupado });
            })
            .catch((err) => {
                reject(err);
            })
    });
};

EquipoRepository.prototype.getGarantia = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select id as value, garantia as label from garantia`)
            .then((result) => {
                resolve({ garantia: result });
            })
            .catch((err) => {
                reject(err);
            })
    })
};

EquipoRepository.prototype.getCarga = function() {
    return new Promise((resolve, reject) => {
        new this.DB().queryStream(`select id as value,carga as label from carga`)
            .then((result) => {
                resolve({ carga: result });
            })
            .catch((err) => {
                reject(err);
            })
    })
};

EquipoRepository.prototype.getSnmp = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select id as value,version as label from snmp`)
            .then((result) => {
                resolve({ snmp: result });
            })
            .catch((err) => {
                reject(err);
            })
    })

};

EquipoRepository.prototype.getSO = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select id as value,sistema_operativo as label from sistema_operativo`)
            .then((result) => {
                resolve({ so: result });
            })
            .catch((err) => {
                reject(err);
            })
    })
};

EquipoRepository.prototype.getEstado = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select id as value,estado as label from estado`)
            .then((result) => {
                resolve({ estado: result });
            })
            .catch((err) => {
                reject(err);
            })
    })
};

EquipoRepository.prototype.getXFS = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`select id as value, xfs as label from xfs`)
            .then((result) => {
                resolve({ xfs: result });
            })
            .catch((err) => {
                reject(err);
            })
    })
};

EquipoRepository.prototype.getModulosEquipo = function() {
    return new Promise((resolve, reject) => {
        new this.DB().executeQuery(`SELECT _m.id as value, modulo as label, tipo_equipo as idTipo,_p.id_ventana_horaria as idVentana from modulos _m LEFT JOIN prestacion _p on _p.id = _m.id_prestacion`)
            .then((result) => {
                let resultAgrupado = {};
                for (let i = 0; i < result.length; i++) {
                    let obj = result[i];
                    if (resultAgrupado.hasOwnProperty(obj.idTipo)) {
                        resultAgrupado[obj.idTipo].push(obj);
                    } else {
                        resultAgrupado[obj.idTipo] = [obj];
                    }
                }
                resolve({ modulos: resultAgrupado });
            })
            .catch((err) => {
                reject(err);
            })
    })
};


module.exports = new EquipoRepository();