/**
 * Created by mc185249 on 2/16/2017.
 */
let Equipo = require("../Services/InventarioEquipo");
let Posicion = require("../Services/InventarioPosicion");
let login = require("../Services/loginService");
let Site = require("../Services/inventarioSite");
let routerLogin = require('./RouterLogin');
let routerEquipo = require("./RouterEquipo");
let routerInicidente = require("./RouterInicidente");
let routerSite = require("./RouterSite");
let routerSource = require("./RouterSource")

function Api(Router) {

    routerLogin(Router);

    routerEquipo(Router);

    routerInicidente(Router);

    routerSite(Router);

    routerSource(Router);

    Router.delete("/EquipoDelete/:idEquipo", (req, res) => {
        Equipo().DeleteEquipo(req.params.idEquipo, req.headers.authorization)
            .then((result) => {
                res.status(200).json({});
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    })

    Router.post("/Posicion", (req, res) => {
        Posicion().newPosicion(req.body, req.headers.authorization)
            .then((result) => {
                res.status(200).json({});
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.put("/Posicion", (req, res) => {
        Posicion().updatePosicion(req.body, req.headers.authorization)
            .then((result) => {
                res.status(200).json({});
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.put("/Posicion/Incidente/:idTicket", (req, res) => {
        Posicion().updatePosicionSinIncidente(req.body, req.headers.authorization, req.params.idTicket)
            .then((result) => {
                res.status(200).json({});
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/posicion/:cliente/:site/:nombrePosicion/:tipoSite", (req, res) => {
        Posicion().getPosicionByFiltro(req.params, req.headers.authorization)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    })

    Router.get("/posicion/edit/:idPosicion", (req, res) => {
        Posicion().getPosicionbyId(req.params.idPosicion)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    })

    Router.get("/Equipo/:idTipoEq/:idClient/:idInstitucion/:idSite/:Pais/:serie", (req, res) => {
        Equipo().getEquipos(req.params, req.headers.authorization)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    return Router;
}

module.exports = Api;