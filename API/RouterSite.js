let Site = require("../Services/inventarioSite");

function siteController() {
    Router.get('/site/:idClient', (req, res) => {
        Site().getSiteByidClient(req.params.idClient)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });

    Router.get('/siteClient/:idSite', (req, res) => {
        Site().getSiteClientByIdSite(req.params.idSite)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                err = err.hasOwnProperty("message") ? err.message : err;
                res.status(400).json({ err: err });
            });
    });

}

module.exports = siteController;