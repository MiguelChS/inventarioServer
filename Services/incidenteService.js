var repoInicidente = require("../Repository/Incidente");

module.exports = {
    getInicidente: () => {
        return new Promise((resolve, reject) => {
            repoInicidente.getInicidente()
                .then(result => resolve(result.data))
                .catch(err => reject(err))
        })
    }
}