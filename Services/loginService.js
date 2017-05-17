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
                                institucion:result.institucion,
                                token:jwt.sign({
                                    idUser:result.idUser,
                                    nombre:result.nombre,
                                    institucion:result.institucion,
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
                        resolve(decoded)
                    }
                });
            })
        }
    }
}

module.exports = Login;