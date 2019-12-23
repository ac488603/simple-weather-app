const path = require('path');
const express = require('express');
const app =  express();
const hbs = require('hbs');
const weather =  require('./utils/weather'); 
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname,'../templates/partials');
const viewsPath = path.join(__dirname,'../templates/views');

//setup static directory to serve items.
app.use(express.static(publicDirectoryPath));

//this line of code lets express know that i am using the handlebars view engine
app.set('view engine', 'hbs');
//this line of code lets express know that my templates can be found in the templates directory
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req,res) => {
    res.render('index', {title: 'Weather',
    name:'Adam Castillo'});
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
    name:'Adam Castillo'});
});

app.get('/help', (req,res) => {
    res.render('help', {title:'help',
    name:'Adam Castillo'});
});
//* is the wildcard character. This character represents any input
app.get('/help/*',(req,res) => {
    res.render('404',{error: 'Help Article Not Found.'});
});

// The '/weather' endpoint requires the address as a query parameter. The address is passed along to a geolocation 
// function which takes the address and returns the latitude and longitude. The latitude and longitude are then passed to 
// another function called get weather which querys the mapbox api for the current weather at the provided location. 
app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send({error : 'An address is required!'}); 
    }

    weather.geocode(req.query.address, (error, {latitude, longitude, location_name } = {}) => {
        if (error) {
            return res.send({error});
        }
        
        weather.getWeather(latitude,longitude, (error, forecast) => {
            if (error) {
                return res.send({error});
            }
            
            res.send({forecast:`It is currently ${forecast.currently.temperature} degrees fahrenheit in ${location_name}. There is a ${forecast.currently.precipProbability} percent chance of precipatation. Summary of weather: ${ forecast.hourly.summary}`,
                address: req.query.address, location_name}); 

        })
        
    }); 

});

// any route that is not defined above will be caught by this end point
app.get('*',(req,res) => {
    res.render('404', {error: 'Page Not Found!'});
});


app.listen(port, ()=> console.log(`Server is listening on port ${port}`)); 