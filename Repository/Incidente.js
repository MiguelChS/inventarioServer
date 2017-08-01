let axios = require("axios");
let moment = require("moment");
let DB = require("./DB/SqlServer");

module.exports = {
    createIncidente: (form) => {
        return axios.post('http://localhost:3005/api/Incidente', form)
    },
    getIncidente: () => {
        return axios.get('http://localhost:3005/api/Incidente');
    },
    getState: () => {
        return axios.get('http://localhost:3005/api/Estados')
    },
    changeState: (form) => {
        return axios.put('http://localhost:3005/api/Incidente', form);
    },
    getIncidenteByUser: (idUser) => {
        return axios.get(`http://localhost:3005/api/Incidente/${idUser}`);
    },
    getAccionesIncidente: () => {
        return new Promise((resolve, reject) => {
            new DB().executeQuery(`select id as [value], descripcion as label from Tipo_Accion_Incidente`)
                .then((result) => {
                    resolve({ TipoAccionIncidente: result });
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}