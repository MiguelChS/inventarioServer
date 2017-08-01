/**
 * Created by mc185249 on 5/15/2017.
 */
let lib = require('../lib');
lib();
let repo = require("../Repository/Position");
let service = require("../Services/InventarioPosicion");
let jwt = require('jsonwebtoken');


/*let usuario = data.user;
                let pass = data.pass; */

function Test() {
    service().getPosicionbyId(1877)
        .then((result) => {
            console.log(result)
            x = 12
        })
        .catch((err) => {
            console.log(err);
        })
}
Test();