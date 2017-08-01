let Posicion = require("../Services/InventarioPosicion");

function posicionController(Router) {
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

    Router.get('/posicion/:idSite', (req, res) => {
        Posicion().getPosicionByIdSite(req.params.idSite)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/prestacionEquipo/:idEquipo", (req, res) => {
        Equipo().getPrestacionEquipo(req.params.idEquipo)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
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
}

module.exports = posicionController;