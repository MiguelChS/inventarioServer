/**
 * Created by mc185249 on 5/15/2017.
 */
let lib = require('../lib');
lib();
let repo = require("../Repository/Login");
let service = require("../Services/loginService");
let jwt = require('jsonwebtoken');


/*let usuario = data.user;
                let pass = data.pass; */

function Test() {
    service.Vefericar({ user: 'admin', pass: '1234' })
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err);
        })
}
Test();