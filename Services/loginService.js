let jwt = require('jsonwebtoken');
let repoLogin = require("../Repository/Login");

function Login(){
    return {
        'Vefericar':(data)=>{
            return new Promise((resolve,reject)=>{
                let usuario = data.user;
                let pass = data.pass;
                repoLogin.verificar(usuario,pass)
                    .then((result)=>{
                        if(!result){
                            resolve(null)
                        }else{
                            resolve({
                                nombre:result.nombre,
                                cliente:result.cliente,
                                token:jwt.sign({
                                    idUser:result.idUser,
                                    nombre:result.nombre,
                                    cliente:result.cliente,
                                    exp: Math.floor(Date.now() / 1000) + (60 * 60)}
                                    , 'secretKey')
                            })
                        }
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            })

        },
        'verificarToken':(token)=>{
            return new Promise((resolve,reject)=>{
                jwt.verify(token, 'secretKey',(err,decoded)=>{
                    if(err){
                        resolve(false);
                    }else{
                        delete decoded.exp;
                        delete decoded.iat;
                        delete decoded.idUser;
                        resolve(decoded)
                    }
                });
            })
        }
    }
}

module.exports = Login;