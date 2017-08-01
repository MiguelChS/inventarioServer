let Site = require("../Services/inventarioSite");
let Equipo = require("../Services/InventarioEquipo");

function SourceController(Router) {

    Router.get("/source/getSitePublic/:idTipoLugar", (req, res) => {
        Site.getSitePublicByTipoLugar(req.params.idTipoLugar)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });

    Router.get('/source/site/:idClient', (req, res) => {
        Equipo().getSiteByidClient(req.params.idClient)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/source/sourceInventario", (req, res) => {
        let fs = require("fs");
        fs.readFile("source.json", 'utf8', (err, data) => {
                res.status(200).json(JSON.parse(data));
            })
            /*
                    Equipo().getSource()
                        .then((result) => {
                            res.status(200).json(result);
                        })
                        .catch((err) => {
                            err = err.hasOwnProperty("message") ? err.message : err;
                            res.status(400).json({ err: err });
                        });*/
    });

    Router.get('/source/posicion/:idSite', (req, res) => {
        Equipo().getPosicionByIdSite(req.params.idSite)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/source/geoEstado/:pais", (req, res) => {
        Equipo().getEstado(req.params.pais)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/source/geoCiudad/:pais/:estado", (req, res) => {
        Equipo().getCiudad(req.params.pais, req.params.estado)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/source/geoCodigoPostal/:pais/:estado/:ciudad", (req, res) => {
        Equipo().getCodigoPostal(req.params.pais, req.params.estado, req.params.ciudad)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });
}

module.exports = SourceController;