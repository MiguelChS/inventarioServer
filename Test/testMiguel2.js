let axios = require('axios');
/*
axios({
        method: 'get',
        url: 'http://153.72.42.154:7777/ConsolaWeb/?token=a87b7712d1cf4fb88ac29b1b9eaaafab',
        headers:{
            Cokie:""
        }
    })
    .then(result => {
        console.log(result)
        x = 12;
    })
    .catch(err => console.error(err))*/

fetch({
        method: 'get',
        url: 'http://153.72.42.154:7777/ConsolaWeb/?token=a87b7712d1cf4fb88ac29b1b9eaaafab',
    })
    .then(result => {
        console.log(result)
    })