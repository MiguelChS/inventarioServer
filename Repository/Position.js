/**
 * Created by mc185249 on 3/16/2017.
 */
let  axios = require("axios");

class PositionRepository{
    constructor(){
        this.DB = require("../DB/SqlServer");
    }
}

PositionRepository.prototype.insertPosition = function (formulario) {
    /*let parametros = {
        cliente_id:{
            Value:formulario.clientid,
            Type:"VarChar"
        },
        ncr_id:{
            Value:formulario.ncrid,
            Type:"VarChar"
        },
        id_site:{
            Value:formulario.idSite,
            Type:"Int"
        },
        id_config_gavetas:{
            Value:formulario.idconfiggavetas,
            Type:"Int"
        },
        id_tabla_status:{
            Value:formulario.id_status,
            Type:"Int"
        },
        id_script:{
            Value:formulario.idscript,
            Type:"Int"
        },
        id_command:{
            Value:formulario.idcommand,
            Type:"Int"
        },
        id_usuario:{
            Value:formulario.iduser,
            Type:"Int"
        },
        id_community_string:{
            Value:formulario.idcommunitystring,
            Type:"Int"
        },
        ip:{
            Value:formulario.ip,
            Type:"VarChar"
        },
        dato2:{
            Value:formulario.dato2,
            Type:"VarChar"
        },
        dato3:{
            Value:formulario.dato3,
            Type:"VarChar"
        },
        id_comunicacion:{
            Value:formulario.idcomunicacion,
            Type:"Int"
        },
        id_slm:{
            Value:formulario.idslm,
            Type:"Int"
        },
        id_flm:{
            Value:formulario.idflm,
            Type:"Int"
        },
        f_inicio:{
            Value:'2017-02-01',
            Type:"Date"
        },
        f_fin:{
            Value:'2017-02-01',
            Type:"Date"
        },
        f_lastupdate:{
            Value:'2017-02-01',
            Type:"Date"
        },
        id_ubicacion_en_site:{
            Value:formulario.idubicacionensite,
            Type:"Int"
        },
        horas_separados_por_coma:{
            Value:'',
            Type:"Text"
        }
    }
    return new this.DB().procedure('sp_Insert_Inv_Posicion',parametros)*/
    return axios.post('http://lnxsrv02:3001/',formulario)
};

PositionRepository.prototype.deletePosicion = function (idPosicion) {
    return axios(
        {
            method: 'DELETE',
            url: 'http://lnxsrv01:3001/position',
            data: idPosicion
        });
};

PositionRepository.prototype.getPosicionByIdSite = function (idSite) {
    return new this.DB().executeQuery(`SELECT id as value,cliente_id as label from inv_posicion where id_site=${idSite}`)
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