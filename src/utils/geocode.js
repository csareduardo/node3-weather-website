const request = require('request');

const geocode = function (address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)
        + '.json?access_token=pk.eyJ1IjoiY3NhcmdseiIsImEiOiJjazJudGw1ODEwNDZwM25xcTRpcGFieWh3In0.qvfE0Z11kAO2m9HyTDxq9Q';

    request({ url, 'json': true }, (error, response) => {
        const {
            body:{
                message,
                features:{ length }
            }
        } = response;
        if(error){
            callback('Unable to connect to location service!', undefined);
        } else if (message || length === 0) {
            callback('Unable to find location! Try another one', undefined);
        }else{
            let {
                body: {
                    features: [{
                        center:[longitude, latitude],
                        place_name: location
                    }]
                }
            } = response;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
};

module.exports = geocode;