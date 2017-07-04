/**
 * Created by mc185249 on 4/5/2017.
 */
let jwt = require('jsonwebtoken');
let repoPosition = require("../Repository/Position");

function Posicion() {
    return {
        'newPosicion': (form, token) => {
            form.id_user = jwt.decode(token).idUser;
            return repoPosition.insertPosition(form)
        },

        'getPosicionByIdSite': (idSite) => {
            return repoPosition.getPosicionByIdSite(idSite);
        }

    }
}

module.exports = Posicion;