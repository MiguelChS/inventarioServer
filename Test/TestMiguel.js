/**
 * Created by mc185249 on 5/15/2017.
 */
let login = require("../Repository/Login");

function Test() {
    login.verificar()
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            console.log(err);
        })
}

Test();