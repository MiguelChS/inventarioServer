let jwt = require('jsonwebtoken');
let repoLogin = require("../Repository/Login");

function Login() {
    return {
        'Vefericar': (data) => {
            return new Promise((resolve, reject) => {
                let usuario = data.user;
                let pass = data.pass;
                repoLogin.validar(usuario, pass)
                    .then((resultUser) => {
                        if (!resultUser) {
                            resolve(null)
                        } else {
                            Promise.all([repoLogin.usuarioCliente(resultUser.id), repoLogin.preferenciaCliente(resultUser.id)])
                                .then(allResult => {
                                    let usuarioFinal = {
                                            nombreCompleto: resultUser.nombreCompleto,
                                            roles: resultUser.roles,
                                            camposRequeridos: resultUser.camposRequeridos,
                                            clientes: allResult[0].map(x => {
                                                let pre = allResult[1].find(z => z.idCliente == x.value);
                                                if (pre) { x.camposRequeridos = pre.camposRequeridos };
                                                return x;
                                            })
                                        }
                                        //agregamos el token
                                    usuarioFinal.token = jwt.sign(Object.assign({}, usuarioFinal, { idUser: resultUser.id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }), 'secretKey')
                                    resolve(usuarioFinal)
                                })
                                .catch(err => reject(err));
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })

        },
        'getDataToken': (token) => {
            return new Promise((resolve, reject) => {
                jwt.verify(token, 'secretKey', (err, decoded) => {
                    if (err) {
                        reject();
                    } else {
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

module.exports = Login();