let loginService = require('../Services/loginService');

function loginController(Router) {

    Router.post("/login", (req, res) => {
        loginService.Vefericar(req.body)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                res.status(400).json({ err: mjsErr });
            });
    });

    Router.get("/login", (req, res) => {
        loginService.getDataToken(req.headers.authorization)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(401).send();
            });
    });

}

module.exports = loginController;