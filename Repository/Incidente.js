let axios = require("axios");
let moment = require("moment");

module.exports = {
    createIniciente: (form) => {
        return axios.post('http://localhost:3005/api/Incidente', form)
    },
    getInicidente: () => {
        return axios.get('http://localhost:3005/api/Incidente');
    }
}