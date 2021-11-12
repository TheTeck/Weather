const request = require('request');

const apiKey = process.env.WEATHER_KEY;
const geoKey = process.env.GEOLOCATION_KEY

module.exports = {
    getCurrent,
    getSevenDay
};

// Return the object from the API call with the zipcode provided as parameter
function getCurrent (req, res) {

    let zipcode = '90210';

    if (req.params.id === 'local') {
        request({
                url: `https://geolocation-db.com/json/${geoKey}`,
                json: true
            },
            function (error, response, body) {
                
                if (!error && response.statusCode === 200) {
                    zipcode = body.postal;
                    getTheWeather(zipcode, res); 
                    
                }
            }
        );
    } else {
        getTheWeather(req.params.id, res);
    }

    
}

function getTheWeather (zip, res) {
    request(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`,
        function(err, response, body) {
            
            if (err) {
                res.status(400).send({ message: "Invalid zipcode" });
            }
            let data = JSON.parse(body);
            res.send(data);
        }
    );
}

// Return the object from the One Call API using the lat and lon parameters
function getSevenDay (req, res) {
    request(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.lon}&appid=${apiKey}&units=imperial`,
        function(err, response, body) {
            
            if (err) {
                res.status(400).send({ message: "Invalid coordinates" });
            }
            
            let data = JSON.parse(body);
            res.send(data);
        }
    );
}