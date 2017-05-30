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
        new this.DB().executeQuery(`
        SELECT _u.id as userId,_u.nombre,_c.id as idClient,_c.cliente_d1 as cliente,_i.id as idInstitucion,_i.institucion_nombre FROM usuario _u
          INNER JOIN cliente_usuario _cu on _cu.id_usuario = _u.id
          INNER JOIN cliente_institucion _ci on _ci.id_cliente = _cu.id_cliente
          INNER JOIN institucion _i on _i.id = _ci.id_institucion
          INNER JOIN cliente _c on _c.id = _cu.id_cliente
        WHERE  _u.usuario = '${username}' AND  _u.pass = '${pass}'`)
            .then((result)=>{
                if(!result.length) resolve(null);
                let dataUser = {
                    cliente:[]
                };
                let flagUsuario = true;
                let auxId = {};
                for(let i = 0; i < result.length; i++){
                    let data = result[i];
                    if(flagUsuario){
                        dataUser.nombre = data.nombre;
                        dataUser.idUser = data.userId;
                    }
                    let existeClient = auxId[data.idClient];
                    if(existeClient){
                        let cliente = dataUser.cliente.find(obj => obj.value == data.idClient);
                        cliente.institucion.push({
                            label:data.institucion_nombre,
                            value:data.idInstitucion
                        })
                    }else{
                        auxId[data.idClient] = true;
                        dataUser.cliente.push({
                            value:data.idClient,
                            label:data.cliente,
                            institucion:[{
                                label:data.institucion_nombre,
                                value:data.idInstitucion
                            }]
                        })
                    }
                }
                resolve(dataUser);
            })
            .catch((err)=>{
                reject(err);
            })
    });
};

module.exports = new LoginRepository();