const request = require('request');

const getWeather = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/3a9b399fcdd47f3a1b0e950493deb48a/${latitude},${longitude}`;

    request({url, json: true}, (error, {body} = {}) => {
    if (error) {
        callback(`Can't find a network!`, undefined);
    } else if (body.error) {
        callback(body.error, undefined);
    } else {
        callback(undefined,body);
    }
}); 
}

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWM0ODg2MDMiLCJhIjoiY2syejl2b3Q5MGZucDNjbXNienR6czA3ZCJ9.BDP8D5nXu420PUD93k7mxw`;
    request({url,  json: true},(error, {body} ={}) => {
        if (error) {
            callback(`Can't connect to a Network!`); 
        } else if (body.message == 'Not Found' || body.features.length == 0) {
            callback('Unable to find location. Try another search.'); 
        } 
        else{
            const data =  {
                'latitude' : body.features[0].center[1],
                'longitude' : body.features[0].center[0],
                'location_name': body.features[0].place_name,
            };
            callback(undefined, data);
        }
    });
}

module.exports = {getWeather, geocode };