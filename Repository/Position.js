/**
 * Created by mc185249 on 3/16/2017.
 */
class PositionRepository{
    constructor(){
        this.DB = require("../DB/SqlServer");
    }
}

PositionRepository.prototype.getPosition = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,cliente_id as label,id_site as idSite,1 as flag from inv_posicion where f_baja is NULL `)
            .then((result)=>{
                let resultAgrupado = {};
                for(let i = 0; i < result.length ; i++){
                    let obj = result[i];
                    if(resultAgrupado.hasOwnProperty(obj.idSite)){
                        resultAgrupado[obj.idSite].push(obj);
                    }else{
                        resultAgrupado[obj.idSite] = [obj];
                    }
                }
                resolve({position:resultAgrupado});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

PositionRepository.prototype.getGavetas = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT configuracion as label,id as value from configuracion_gavetas`)
            .then((result)=>{
                resolve({gavetas:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getTablaStatus = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT descripcion as label, id as value from tabla_status`)
            .then((result)=>{
                resolve({tablaStatus:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getCommandScript = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT command as label, id as value from command_script`)
            .then((result)=>{
                resolve({commandScript:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getCallingScript = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT script as label, id as value FROM calling_script`)
            .then((result)=>{
                resolve({callingScript:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getCommunity = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`select ISNULL(descripcion,'') + ' - ' + ISNULL(COMMUNITY,'') as label, id as value from community_string`)
            .then((result)=>{
                resolve({community:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getComunicacion = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,tipo_enlace as label from comunicacion`)
            .then((result)=>{
                resolve({comunicacion:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getSLM = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,slm as label from slm`)
            .then((result)=>{
                resolve({slm:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getFLM = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,flm as label from flm`)
            .then((result)=>{
                resolve({flm:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getPrestacion = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value, prestacion as label from prestacion`)
            .then((result)=>{
                resolve({prestacion:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getUbicacionSite = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,ubicacion as label from ubicacion_en_site`)
            .then((result)=>{
                resolve({ubicacionSite:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};

PositionRepository.prototype.getTypeHora = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,nombre as label FROM ventana_horaria`)
            .then((result)=>{
                resolve({TypeHora:result})
            })
            .catch((err)=>{
                reject(err)
            })
    })
};


module.exports = new PositionRepository();