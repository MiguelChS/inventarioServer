/**
 * Created by mc185249 on 2/16/2017.
 */
let Equipo = require("../Services/InventarioEquipo");
let Posicion = require("../Services/InventarioPosicion");
let login = require("../Services/loginService");
let Site = require("../Services/inventarioSite");
let fs = require("fs");

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

    Router.get('/site/:idClient',(req,res)=>{
        Equipo().getSiteByidClient(req.params.idClient)
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

    Router.get('/posicion/:idSite',(req,res)=>{
        Equipo().getPosicionByIdSite(req.params.idSite)
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

    Router.post("/Equipo",(req,res)=>{
        Equipo().newEquipo(req.body,req.headers.authorization)
            .then((result)=>{
                res.status(200).json({});
            })
            .catch((err)=>{
                err = err.response ? err.response.data : err.message;
                res.status(400).json({err:err});
            });
    });

    Router.post("/Posicion",(req,res)=>{
        Posicion().newPosicion(req.body,req.headers.authorization)
            .then((result)=>{
                res.status(200).json({});
            })
            .catch((err)=>{
                err = err.response ? err.response.data : err.message;
                res.status(400).json({err:err});
            });
    });

    Router.post("/Site",(req,res)=>{
        Site().newSite(req.body,req.headers.authorization)
            .then((result)=>{
                res.status(200).json({});
            })
            .catch((err)=>{
                err = err.response ? err.response.data : err.message;
                res.status(400).json({err:err});
            });
    });

    Router.get("/getSitePublic/:idTipoLugar",(req,res)=>{
        Site().getSitePublicByTipoLugar(req.params.idTipoLugar)
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