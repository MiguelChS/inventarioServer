/**
 * Created by mc185249 on 2/16/2017.
 */
let Equipo = require("../Services/InventarioEquipo");
let Posicion = require("../Services/InventarioPosicion");
let login = require("../Services/loginService");
let fs = require("fs");

function Api(Router) {

    Router.get("/sourceInventario",(req,res)=>{
        /*fs.readFile("source.json",'utf8',(err,data)=>{
            res.status(200).json(JSON.parse(data));
        });*/
        Equipo().getSource()
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.get('/site/:idClient/:origen',(req,res)=>{
        Equipo().getSiteByidClient(req.params.idClient,req.params.origen)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.get('/siteClient/:idSite',(req,res)=>{
        Equipo().getSiteClientByIdSite(req.params.idSite)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.get('/posicion/:idSiteClient',(req,res)=>{
        Equipo().getPosicionByIdSiteClient(req.params.idSiteClient)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.get('/equipo/:idSiteClient',(req,res)=>{
        Equipo().getEquipoByIdSiteClient(req.params.idSiteClient)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.get("/prestacionEquipo/:idEquipo",(req,res)=>{
        Equipo().getPrestacionEquipo(req.params.idEquipo)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.get("/geoEstado/:pais",(req,res)=>{
        Equipo().getEstado(req.params.pais)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.get("/geoCiudad/:pais/:estado",(req,res)=>{
        Equipo().getCiudad(req.params.pais,req.params.estado)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.get("/geoCodigoPostal/:pais/:estado/:ciudad",(req,res)=>{
        Equipo().getCodigoPostal(req.params.pais,req.params.estado,req.params.ciudad)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({err:err});
            });
    });

    Router.post("/login",(req,res)=>{
        login().Vefericar(req.body)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                res.status(400).json({err:mjsErr});
            });
    });

    Router.get("/VerificarToken/:token",(req,res)=>{
        login().verificarToken(req.params.token)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                res.status(400).json({err:mjsErr});
            });
    });

    Router.get("/siteBy/:token",(req,res)=>{
        login().verificarToken(req.params.token)
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                res.status(400).json({err:mjsErr});
            });
    });

    return Router;
}

module.exports = Api;