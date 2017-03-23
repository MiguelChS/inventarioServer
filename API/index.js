/**
 * Created by mc185249 on 2/16/2017.
 */
let Equipo = require("../Services/InventarioEquipo");

function Api(Router) {
    Router.get("/sourceIvenEquipo",(req,res)=>{
        Equipo().getSource()
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });
    Router.post("",(req,res)=>{

    });

    return Router;
}

module.exports = Api;