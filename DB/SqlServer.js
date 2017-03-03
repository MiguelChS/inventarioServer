/**
 * Created by mc185249 on 3/3/2017.
 */
const sql = require("mssql");

class sqlServer{
    constructor(){
        let config = {
            user: '',
            password:'',
            server:'',
            database:''
        };
        Object.assign(config,JSON.parse(process.env.DATABASE_INVEN));
        config.connectionTimeout= 300000;
        config.requestTimeout= 300000;
        this.connection = new sql.Connection(config);
        this.Request = new sql.Request(this.connection);
    }
}

sqlServer.prototype.close = function () {
    this.connection.close();
};

sqlServer.prototype.executeQuery = function (query) {
    return new Promise((resolve,reject)=>{
        //conectando a la base datos
        this.connection.connect()
            .then(()=>{
                //ejecutando query
                this.Request.query(query)
                    .then((result)=>{
                        resolve(result);
                        this.close();
                    })
                    .catch((err)=>{
                        reject(err);
                        this.close();
                    })
            })
            .catch((err)=>{
                reject(err);
            });
    });
};

sqlServer.prototype.queryStream = function (query) {
    return new Promise((resolve,reject)=>{
        this.connection.connect()
            .then(()=>{
                this.Request.stream = true;
                this.Request.query(query);
                var resultado = [];
                this.Request.on('row',(row) => {
                    resultado.push(row);
                });
                this.Request.on('error', (err) =>{
                    reject(err);
                    this.close();
                });

                this.Request.on('done', ()=> {
                    resolve(resultado);
                    this.close();
                });

            })
            .catch((err)=>{
                reject(err);
            })
    })
};


module.exports = sqlServer;