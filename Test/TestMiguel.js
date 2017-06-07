/**
 * Created by mc185249 on 5/15/2017.
 */
let login = require("../Repository/Equipo");

function Test() {
    login.getByIdEquipo(3)
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        })
}

Test();