/**
 * Created by mc185249 on 5/23/2017.
 */
let jwt = require('jsonwebtoken');
let repoSite = require("../Repository/Site");

function Posicion() {
    return {
        'newSite': (form, token) => {
            form.idUsuario = jwt.decode(token).idUser;
            return repoSite.insertSiteClient(form)
        },
        'getSitePublicByTipoLugar': (idLugar) => {
            return repoSite.getSiteByLugar(idLugar)
        },
        'getSiteByidClient': (idClient) => {
            return repoSite.getSiteByidClientD1(idClient);
        },
        'getSiteClientByIdSite': (idSite) => {
            return repoSite.getSiteClienteIdSite(idSite)
        },
    }
}

module.exports = Posicion;