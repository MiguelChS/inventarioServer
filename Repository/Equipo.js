/**
 * Created by mc185249 on 3/3/2017.
 */
let axios = require("axios");

class EquipoRepository{
    constructor(){
        this.DB = require("../DB/SqlServer");
    }
}

EquipoRepository.prototype.insertEquipo = function (formulario) {
    return axios.post('http://153.72.43.146:3000/',formulario)
};

EquipoRepository.prototype.getEquipoByIdSiteClient = function (idSiteClient) {
    return new this.DB().executeQuery(`SELECT DISTINCT e.id as value, e.id_equipo_ncr as label
                                        FROM inv_equipo e
                                        inner join inv_posicion p on e.id_posicion = p.id
                                        inner join inv_site_cliente c on p.id_site_cliente = c.id AND c.id = ${idSiteClient}
                                        WHERE e.activo = 1`)
};

EquipoRepository.prototype.getlistMarca = function () {
    return new Promise((resolve,reject)=>{
        new this.DB().executeQuery(`select  id as value, marca as label from marca`)
            .then((result)=>{
                resolve({marcas:result})
            })
            .catch((err)=>{
                reject(err)
            })
    });
};

EquipoRepository.prototype.getEquipos = function () {
    return new Promise((resolve,reject)=>{
        new this.DB().executeQuery(`select id as value, tipo_equipo as label from tipo_equipo where id <> 2`)
            .then((result)=>{
                resolve({Equipos:result})
            })
            .catch((err)=>{
                reject(err)
            })
    });
};

EquipoRepository.prototype.getTipoEquipo = function () {
    return new Promise((resolve,reject)=>{
        new this.DB().executeQuery(`select id as value, tipo_equipo as label,id_tipo_equipo as idEquipo from tipo_eq`)
            .then((result)=>{
                let resultAgrupado = {};
                for(let i = 0; i < result.length ; i++){
                    let obj = result[i];
                    if(resultAgrupado.hasOwnProperty(obj.idEquipo)){
                        resultAgrupado[obj.idEquipo].push(obj);
                    }else{
                        let attr = obj.idEquipo ? obj.idEquipo : "generico";
                        resultAgrupado[attr] = [obj];
                    }
                }
                resolve({tipoEquipo:resultAgrupado})
            })
            .catch((err)=>{
                reject(err)
            })
    });
};


EquipoRepository.prototype.getPlanta = function () {
    return new Promise((resolve,reject)=>{
        new this.DB().queryStream(`select id as value, CONCAT(planta,' - ',prefijo) as label,prefijo,id_marca as idMarca from planta;`)
            .then((result)=>{
                let resultAgrupado = {};
                for(let i = 0; i < result.length ; i++){
                    let obj = result[i];
                    if(resultAgrupado.hasOwnProperty(obj.idMarca)){
                        resultAgrupado[obj.idMarca].push(obj);
                    }else{
                        let attr = obj.idMarca ? obj.idMarca : "generico";
                        resultAgrupado[attr] = [obj];
                    }
                }
                resolve({planta:resultAgrupado});
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

EquipoRepository.prototype.getListModelo = function () {
    return new Promise((resolve,reject) => {
        new this.DB().queryStream(`select id as value, modelo as label, id_marca as idMarca from modelo`)
            .then((result)=>{
                //agrupar por marca
                let resultAgrupado = {};
                for(let i = 0; i < result.length ; i++){
                    let obj = result[i];
                    if(resultAgrupado.hasOwnProperty(obj.idMarca)){
                        resultAgrupado[obj.idMarca].push(obj);
                    }else{
                        resultAgrupado[obj.idMarca] = [obj];
                    }
                }
                resolve({modelo:resultAgrupado});
            })
            .catch((err)=>{
                reject(err);
            })
    });
};

EquipoRepository.prototype.getGarantia = function () {
    return new Promise((resolve,reject) => {
        new this.DB().executeQuery(`select id as value, garantia as label from garantia`)
            .then((result)=>{
                resolve({garantia:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

EquipoRepository.prototype.getCarga = function () {
    return new Promise((resolve,reject)=>{
        new this.DB().queryStream(`select id as value,carga as label from carga`)
            .then((result)=>{
                resolve({carga:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

EquipoRepository.prototype.getSnmp = function () {
    return new Promise((resolve,reject)=>{
        new this.DB().executeQuery(`select id as value,version as label from snmp`)
            .then((result)=>{
                resolve({snmp:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })

};

EquipoRepository.prototype.getSO = function () {
    return new Promise((resolve,reject) => {
        new this.DB().executeQuery(`select id as value,sistema_operativo as label from sistema_operativo`)
            .then((result)=>{
                resolve({so:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

EquipoRepository.prototype.getEstado = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`select id as value,estado as label from estado`)
            .then((result)=>{
                resolve({estado:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

EquipoRepository.prototype.getXFS = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`select id as value, xfs as label from xfs`)
            .then((result)=>{
                resolve({xfs:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

EquipoRepository.prototype.getModulosEquipo = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT _m.id as value, modulo as label, tipo_equipo as idTipo, 0 as selected, 1 as show,_p.id_ventana_horaria as idVentana from modulos _m LEFT JOIN prestacion _p on _p.id = _m.id_prestacion`)
            .then((result)=>{
                let resultAgrupado = {};
                for(let i = 0; i < result.length ; i++){
                    let obj = result[i];
                    if(resultAgrupado.hasOwnProperty(obj.idTipo)){
                        resultAgrupado[obj.idTipo].push(obj);
                    }else{
                        resultAgrupado[obj.idTipo] = [obj];
                    }
                }
                resolve({modulos:resultAgrupado});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

EquipoRepository.prototype.getPrestacionByIdEquipo = function (idEquipo) {
    return new this.DB().executeQuery(`SELECT _p.id_ventana_horaria as idVentanaHoraria FROM modulos_equipo _me
                                    INNER JOIN modulos _m on _m.id = _me.id_modulo
                                    INNER JOIN prestacion _p on _p.id = _m.id_prestacion
                                    WHERE _me.id_equipo = ${idEquipo}  AND _me.f_fin is NULL
                                    `)
};


module.exports = new EquipoRepository();