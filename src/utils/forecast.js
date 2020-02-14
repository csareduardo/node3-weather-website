const request = require('request');

const forecast = function (latitude, longitude, callback) {
    const url = 'https://api.darksky.net/forecast/5e6892c502afcf934e8095649823ad8a/'
        + latitude + ',' + longitude + '?units=si';

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
                            summary,
                            temperatureHigh,
                            temperatureLow
                        }]
                    }
                }
            } = response;
            callback(undefined, summary + ' It is currently ' + temperature + ' degress out. The high temperature today is ' + temperatureHigh
                + ' and low temperature is ' + temperatureLow  + '. There is a ' + precipProbability + '% chance of rain.');
        }
    });  
};

module.exports = forecast;