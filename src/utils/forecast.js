const request = require('request');

const forecast = function (latitude, longitude, callback) {
    const url = 'https://api.darksky.net/forecast/5e6892c502afcf934e8095649823ad8a/'
        + latitude + ',' + longitude;

    request({ url, 'json': true }, (error, response) => {
         const {
             body: {
                 error: errReq
             }
         } = response;
        if(error){
            callback('Unable to connect to forecast service!', undefined);
        } else if (errReq) {
            callback('Unable to find location!, Try another one', undefined);
        }else{
            let {
                body:{
                    currently:{
                        temperature,
                        precipProbability
                    },
                    daily:{
                        data: [{
                            summary
                        }]
                    }
                }
            } = response;
            callback(undefined, {
                summary,
                temperature,
                precipProbability
            });
        }
    });  
};

module.exports = forecast;