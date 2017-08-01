let Site = require("../Services/inventarioSite");

function siteController(Router) {

    Router.post("/Site", (req, res) => {
        Site.newSite(req.body, req.headers.authorization)
            .then((result) => {
                res.status(200).json({});
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.put("/Site", (req, res) => {
        Site.updateSite(req.body, req.headers.authorization)
            .then((result) => {
                res.status(200).send(result)
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.get("/Site/:idSite", (req, res) => {
        Site.buscarSiteById(req.params.idSite)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    })

    Router.get("/Site/filtro/:idEl", (req, res) => {
        Site.buscarSiteByFiltro(req.headers.authorization)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });

    Router.put("/Site/correccion/:idTicket", (req, res) => {
        Site.updateCorreccion(req.body, req.headers.authorization, req.params.idTicket)
            .then((result) => {
                res.status(200).send()
            })
            .catch((err) => {
                err = err.response ? err.response.data : err.message;
                res.status(400).json({ err: err });
            });
    });
}

module.exports = siteController;