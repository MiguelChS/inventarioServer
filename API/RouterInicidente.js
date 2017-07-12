let Incidente = require("../Services/incidenteService");

function Controller(Router) {
    Router.get("/Inicidente", (req, res) => {
        Incidente.getInicidente()
            .then(result => res.status(200).json(result))
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });
}

module.exports = Controller;