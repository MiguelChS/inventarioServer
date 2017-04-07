/**
 * Created by mc185249 on 2/16/2017.
 */
let Equipo = require("../Services/InventarioEquipo");
let Posicion = require("../Services/InventarioPosicion");

function Api(Router) {
    Router.get("/sourceInventario",(req,res)=>{
        Equipo().getSource()
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });
    return Router;
}

module.exports = Api;