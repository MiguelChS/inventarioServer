let Equipo = require("../Services/InventarioEquipo");

function equipoController() {
    Router.get('/equipo/:idSiteClient', (req, res) => {
        Equipo().getEquipoByIdSiteClient(req.params.idSiteClient)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });
}

module.exports = equipoController;