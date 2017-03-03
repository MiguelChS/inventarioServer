/**
 * Created by mc185249 on 3/3/2017.
 */
class EquipoRepository{
    constructor(){
        this.DB = require("../DB/SqlServer");
    }
}

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

EquipoRepository.prototype.getTipoequipo = function () {
    return new Promise((resolve,reject)=>{
        new this.DB().executeQuery(`select id as value, tipo_equipo as label from tipo_eq`)
            .then((result)=>{
                resolve({tipoEquipo:result})
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
        new this.DB().executeQuery(`SELECT id as value, modulo as label, tipo_equipo as idTipo from modulos`)
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

module.exports = new EquipoRepository();