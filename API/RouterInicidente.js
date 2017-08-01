let Incidente = require("../Services/incidenteService");

function Controller(Router) {
    Router.get("/Incidente", (req, res) => {
        Incidente.getInicidente()
            .then(result => res.status(200).json(result))
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/Incidente/Usuario", (req, res) => {
        Incidente.getIncidenteByUser(req.headers.authorization)
            .then(result => res.status(200).json(result))
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/Incidente/Estado", (req, res) => {
        Incidente.getState()
            .then(result => res.status(200).json(result))
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.put("/Incidente", (req, res) => {
        Incidente.changeStateIncidente(req.body, req.headers.authorization)
            .then(result => res.status(200).send())
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

}

module.exports = Controller;