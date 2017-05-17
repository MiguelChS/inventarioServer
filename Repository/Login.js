/**
 * Created by mc185249 on 5/15/2017.
 */
class LoginRepository{
    constructor(){
        this.DB = require("../DB/SqlServer");
    }
}

LoginRepository.prototype.verificar = function (username,pass) {
    return new Promise((resolve,reject)=>{
        new this.DB().executeQuery(`SELECT _u.nombre,_u.id,_o.id_origen as value,_o.nombre as label,_o.origen from usuario _u
                                        INNER JOIN usuario_organizacion _uo on _uo.id_usuario = _u.id
                                        INNER JOIN organizacion _o on _o.id = _uo.id_organizacion
                                        WHERE _u.usuario ='${username}' and _u.pass='${pass}'`)
            .then((result)=>{
                if(!result.length) resolve(null);
                let idUser = result[0].id;
                let nombre = result[0].nombre;
                let institucion = result.map((obj)=>{
                    delete obj.nombre;
                    delete obj.id;
                    return obj;
                });
                resolve({idUser,nombre,institucion})
            })
            .catch((err)=>{
                reject(err);
            })
    });
};

module.exports = new LoginRepository();