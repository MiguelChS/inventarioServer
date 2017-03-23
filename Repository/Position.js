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
        new this.DB().executeQuery(`SELECT id as value,cliente_id as label,id_site as idSite from inv_posicion where f_baja is NULL `)
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

module.exports = new PositionRepository();