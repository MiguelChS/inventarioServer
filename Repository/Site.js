/**
 * Created by mc185249 on 3/16/2017.
 */
let  axios = require("axios");

class SiteRepository{
    constructor(){
        this.DB = require("../DB/SqlServer");
    }
}
SiteRepository.prototype.insertSiteClient = function (formulario) {
    return axios.post('http://lnxsrv02:3003/',formulario);
};


SiteRepository.prototype.getSiteByInstitucion = function (idInstitucion) {
    return new this.DB().executeQuery(`SELECT DISTINCT _is.nombre_site_id as label ,_is.id as value from inv_equipo _ie
                            INNER JOIN inv_posicion _p on _p.id = _ie.id_posicion and _p.activo = 1
                            INNER JOIN inv_site_cliente _isc on _isc.id = _p.id_site_cliente and _isc.activo = 1
                              INNER JOIN inv_site _is on _is.id = _isc.id_inv_site and _is.activo = 1
                            WHERE id_institucion = ${idInstitucion} and _ie.activo = 1`)
};
SiteRepository.prototype.getSiteByidClientD1 = function (idClient) {
    return new this.DB().executeQuery(`SELECT  ID_Site as value, Nombre_Site as label from SITE WHERE Id_cliente = ${idClient}`)
};

SiteRepository.prototype.getSiteClienteIdSite = function (idSite) {
    return new this.DB().executeQuery(`select id as value, nombre_site as label, id_inv_site as idSite FROM inv_site_cliente where id_inv_site=${idSite} and f_baja is NULL`);
};

SiteRepository.prototype.getSiteByLugar = function (idLugar) {
    return new this.DB().executeQuery(`
    SELECT Nombre_Publico as label ,Nombre_Publico as value, Direccion, Id_Tipo_Lugar , _tl.tipo_direccion,_S.latitud,_S.longitud,_S.offset,_S.Id_geo,_g.pais,_g.estado,_g.ciudad,_g.codigo_postal FROM Site _S
    INNER JOIN tipo_Lugar _tl on _tl.id = _S.Id_Tipo_Lugar
    INNER JOIN geo _g on _g.id = _S.Id_geo
    WHERE Id_Tipo_Lugar = ${idLugar}
    GROUP BY  Nombre_Publico, Direccion ,Id_Tipo_Lugar,_tl.tipo_direccion,_S.latitud,_S.longitud,_S.offset,_S.Id_geo,_g.pais,_g.estado,_g.ciudad,_g.codigo_postal`);
};

SiteRepository.prototype.getTipoSite = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,CONCAT(tipo_site,' - ',nomenclatura_site) as label from tipo_site`)
            .then((result)=>{
                resolve({TipoSite:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

SiteRepository.prototype.getGeoClient = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,zona1 as label FROM geo_cliente`)
            .then((result)=>{
                resolve({geoClient:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

SiteRepository.prototype.getGeoNcr = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value, CONCAT(territorio,' - ',branch,' - ',centro_serv) as label from geo_ncr`)
            .then((result)=>{
                resolve({geoNCR:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

SiteRepository.prototype.getTipoDirecion = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,tipo_direccion as label FROM tipo_Lugar`)
            .then((result)=>{
                resolve({TipoLugar:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};


SiteRepository.prototype.getPais = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`select pais as value, pais as label from geo group BY pais`)
            .then((result)=>{
                resolve({pais:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

SiteRepository.prototype.getEstado = function (pais) {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT estado as value,estado as label from geo WHERE pais ='${pais}' GROUP BY estado`)
            .then((result)=>{
                resolve({estado:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

SiteRepository.prototype.getCiudad = function (pais,estado) {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT ciudad as value,ciudad as label from geo
                                    WHERE pais = '${pais}' AND estado = '${estado}'
                                    GROUP BY ciudad`)
            .then((result)=>{
                resolve({ciudad:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

SiteRepository.prototype.getCodigoPostal = function (pais,estado,ciudad) {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`SELECT id as value,codigo_postal as label from geo
                                    WHERE pais = '${pais}' AND estado = '${estado}' AND ciudad ='${ciudad}'
                                    GROUP BY codigo_postal,id`)
            .then((result)=>{
                resolve({codigoPostal:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

module.exports = new SiteRepository();