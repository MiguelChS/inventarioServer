/**
 * Created by mc185249 on 3/16/2017.
 */
class SiteRepository{
    constructor(){
        this.DB = require("../DB/SqlServer");
    }
}

SiteRepository.prototype.getSite = function () {
    return new Promise((resolve,reject) =>{
        new this.DB().executeQuery(`select id as value, nombre_site_id as label FROM inv_site where f_baja is NULL`)
            .then((result)=>{
                resolve({site:result});
            })
            .catch((err)=>{
                reject(err);
            })
    })
};

module.exports = new SiteRepository();