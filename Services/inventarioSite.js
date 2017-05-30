/**
 * Created by mc185249 on 5/23/2017.
 */
let jwt = require('jsonwebtoken');
let repoSite = require("../Repository/Site");

function Posicion(){
    return {
        'newSite':(form,token)=>{
            form.id_user = jwt.decode(token).idUser;
            return repoSite.insertSiteClient(form)
        },
        'getSitePublicByTipoLugar':(idLugar)=>{
            return repoSite.getSiteByLugar(idLugar)
        }
    }
}

module.exports = Posicion;