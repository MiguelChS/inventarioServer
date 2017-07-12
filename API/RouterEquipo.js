let Equipo = require("../Services/InventarioEquipo");

function equipoController(Router) {
    Router.post("/Equipo", (req, res) => {
        Equipo().newEquipo(req.body, req.headers.authorization)
            .then((result) => {
                res.status(200).json({});
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });
}

module.exports = equipoController;