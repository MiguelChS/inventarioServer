/**
 * Created by mc185249 on 5/15/2017.
 */
class LoginRepository {
    constructor() {
        this.DB = require("./DB/SqlServer");
    }
}

LoginRepository.prototype.validar = function(username, pass) {
    let parametros = {
        usuario: {
            Value: username,
            Type: "VarChar"
        },
        pass: {
            Value: pass,
            Type: "VarChar"
        }
    }
    return new Promise((resolve, reject) => {
        new this.DB().procedure('sp_validar_usuario', parametros)
            .then((result) => {
                if (!result.length) { resolve(null) }
                let usuario = {}
                result.forEach((item, index) => {
                    if (!index) {
                        usuario.nombreCompleto = item.nombreCompleto;
                        usuario.roles = [item.id_rol];
                        usuario.id = item.id;
                        usuario.camposRequeridos = {
                            equipo: item.id_tipo_formulario && item.id_tipo_formulario == 1 ? [item.nameKey] : [],
                            posicion: item.id_tipo_formulario && item.id_tipo_formulario == 2 ? [item.nameKey] : [],
                            site: item.id_tipo_formulario && item.id_tipo_formulario == 3 ? [item.nameKey] : []
                        }
                    } else {
                        usuario.roles.push(item.id_rol);
                        usuario.camposRequeridos.equipo = item.id_tipo_formulario && item.id_tipo_formulario == 1 ? usuario.camposRequeridos.equipo.concat(item.nameKey) : usuario.camposRequeridos.equipo;
                        usuario.camposRequeridos.posicion = item.id_tipo_formulario && item.id_tipo_formulario == 2 ? usuario.camposRequeridos.posicion.concat(item.nameKey) : usuario.camposRequeridos.posicion;
                        usuario.camposRequeridos.site = item.id_tipo_formulario && item.id_tipo_formulario == 3 ? usuario.camposRequeridos.site.concat(item.nameKey) : usuario.camposRequeridos.site;
                    }
                });
                usuario.roles = usuario.roles.unique();
                usuario.camposRequeridos.equipo = usuario.camposRequeridos.equipo.unique();
                usuario.camposRequeridos.posicion = usuario.camposRequeridos.posicion.unique();
                usuario.camposRequeridos.site = usuario.camposRequeridos.site.unique();
                resolve(usuario);
            })
            .catch(err => reject(err))
    })
}

LoginRepository.prototype.usuarioCliente = function(idUser) {
    let parametros = {
        idUsuario: {
            Value: idUser,
            Type: "Int"
        }
    }
    return new Promise((resolve, reject) => {
        new this.DB().procedure('sp_Cliente_Usuario_byId', parametros)
            .then((result) => {
                let cliente = [];
                let auxId = {}; //para guardar los id
                let auxIndex = 0; // guardamos el contador
                result.forEach((item, index) => {
                    let exist = auxId[item.idClient];
                    if (exist) {
                        cliente[exist.index].institucion.push({
                            label: item.institucion_nombre,
                            value: item.idInstitucion
                        })
                    } else {
                        auxIndex = index ? auxIndex + 1 : auxIndex;
                        auxId[item.idClient] = {
                            index: auxIndex
                        }
                        cliente.push({
                            value: item.idClient,
                            label: item.cliente,
                            camposRequeridos: null,
                            institucion: [{
                                label: item.institucion_nombre,
                                value: item.idInstitucion
                            }]
                        })
                    }
                });
                resolve(cliente);
            })
            .catch((err) => {
                reject(err);
            })
    });
};

LoginRepository.prototype.preferenciaCliente = function(idUser) {
    let parametros = {
        idUsuario: {
            Value: idUser,
            Type: "Int"
        }
    }
    return new Promise((resolve, reject) => {
        new this.DB().procedure('sp_cliente_preferencias_by_usuario', parametros)
            .then((result) => {
                let preferencias = []
                let auxId = {};
                let exist;
                let auxIndex = 0;
                result.forEach((item, index) => {
                    exist = auxId[item.id_cliente];
                    if (exist) {
                        let campo = preferencias[exist.index].camposRequeridos;
                        campo.equipo = item.id_tipo_formulario && item.id_tipo_formulario == 1 ? campo.equipo.concat(item.nameKey) : campo.equipo;
                        campo.posicion = item.id_tipo_formulario && item.id_tipo_formulario == 2 ? campo.posicion.concat(item.nameKey) : campo.posicion;
                        campo.site = item.id_tipo_formulario && item.id_tipo_formulario == 3 ? campo.site.concat(item.nameKey) : campo.site;
                    } else {
                        auxIndex = index ? auxIndex + 1 : auxIndex;
                        auxId[item.id_cliente] = {
                            index: auxIndex
                        }
                        preferencias.push({
                            idCliente: item.id_cliente,
                            camposRequeridos: {
                                equipo: item.id_tipo_formulario && item.id_tipo_formulario == 1 ? [item.nameKey] : [],
                                posicion: item.id_tipo_formulario && item.id_tipo_formulario == 2 ? [item.nameKey] : [],
                                site: item.id_tipo_formulario && item.id_tipo_formulario == 3 ? [item.nameKey] : []
                            }
                        })
                    }
                })
                resolve(preferencias);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

module.exports = new LoginRepository();