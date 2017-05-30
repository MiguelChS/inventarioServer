/**
 * Created by mc185249 on 5/15/2017.
 */
let login = require("../Repository/Login");

function Test() {
    login.verificar('WebInventario','1234')
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        })
}

Test();